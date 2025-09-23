import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/themes/theme-provider";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  const toggleTheme = () => {
    if (isDarkMode) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative p-3 rounded-full ${
        isDarkMode ? "bg-emerald-800/50" : "bg-gray-100/80"
      } backdrop-blur-sm transition-all duration-300 group overflow-hidden shadow-lg hover:shadow-xl`}
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, rotate: -180 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDarkMode ? "sun" : "moon"}
          initial={{ scale: 0, rotate: 90 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: -90 }}
          transition={{ duration: 0.3 }}
          className={isDarkMode ? "text-amber-400" : "text-gray-600"}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 pointer-events-none"
        animate={{
          scale: [0.5, 1.5],
          opacity: [0.5, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      
      {/* Glow effect for dark mode */}
      {isDarkMode && (
        <motion.div
          className="absolute inset-0 rounded-full bg-emerald-400/30 blur-md opacity-0 group-hover:opacity-100 pointer-events-none"
          animate={{
            opacity: [0, 0.3, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
      
      <span className="sr-only">Toggle theme</span>
    </motion.button>
  );
}
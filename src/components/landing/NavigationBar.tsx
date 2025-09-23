import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link } from "react-scroll";
import iconJalur from "@/assets/sampan.png";

const Navigation = ({ isDarkMode, setIsDarkMode }: { isDarkMode: boolean; setIsDarkMode: (value: boolean) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out
        ${
          isScrolled
            ? `${isDarkMode ? "bg-emerald-950/85" : "bg-white/85"} backdrop-blur-xl border-b ${isDarkMode ? "border-emerald-700/50" : "border-gray-200/50"} shadow-2xl shadow-emerald-500/10`
            : "bg-transparent border-b border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="home" smooth={true} duration={500} offset={-100} className="cursor-pointer">
            <motion.div className="flex items-center gap-3" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <motion.div whileHover={{ rotate: 360, scale: 1.1 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.6, ease: "easeInOut" }} className="relative">
                <img src={iconJalur} alt="Logo" className="w-12 h-12 drop-shadow-lg" />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-amber-400/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
              <motion.div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 bg-clip-text text-transparent" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                  Pacu Jalur
                </motion.span>
              </motion.div>
            </motion.div>
          </Link>
          <div className="hidden md:flex items-center space-x-2">
            {[
              { to: "home", label: "Beranda", delay: 0.1 },
              { to: "events", label: "Jadwal", delay: 0.15 },
              { to: "gallery", label: "Galeri", delay: 0.2 },
              { to: "lodging", label: "Penginapan", delay: 0.25 },
              { to: "jalur", label: "Jalur", delay: 0.3 },
            ].map((item) => (
              <motion.div key={item.to} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: item.delay }}>
                <Link
                  to={item.to}
                  smooth={true}
                  duration={500}
                  offset={item.to === "home" ? -100 : -80}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer group
                    ${isDarkMode ? "text-stone-300 hover:text-amber-400" : isScrolled ? "text-gray-700 hover:text-amber-600" : "text-white hover:text-amber-300"}`}
                >
                  <span className="relative z-10">{item.label}</span>
                  <motion.div
                    className={`absolute inset-0 rounded-lg ${isDarkMode ? "bg-emerald-800/30" : "bg-gray-100/80"} opacity-0 group-hover:opacity-100`}
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500" initial={{ width: "0%" }} whileHover={{ width: "100%" }} transition={{ duration: 0.3 }} />
                </Link>
              </motion.div>
            ))}
            <motion.button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`relative p-3 rounded-full ml-6 ${isDarkMode ? "bg-emerald-800/50" : "bg-gray-100/80"} backdrop-blur-sm transition-all duration-300 group overflow-hidden`}
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                key={isDarkMode ? "sun" : "moon"}
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -90 }}
                transition={{ duration: 0.3 }}
                className={isDarkMode ? "text-amber-400" : "text-gray-600"}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.div>
              <motion.div
                className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100"
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
            </motion.button>
            <motion.button
              className="relative ml-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold overflow-hidden group shadow-lg"
              whileHover={{
                scale: 1.05,
                shadow: "0 20px 40px rgba(245, 158, 11, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="relative z-10">Beli Tiket</span>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-600 opacity-0 group-hover:opacity-100" initial={{ x: "-100%" }} whileHover={{ x: "0%" }} transition={{ duration: 0.5 }} />
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full" transition={{ duration: 0.6 }} />
            </motion.button>
          </div>
          <motion.button className="md:hidden p-2 rounded-lg" onClick={() => setIsMenuOpen(!isMenuOpen)} whileTap={{ scale: 0.9 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              {isMenuOpen ? (
                <X className={`w-6 h-6 transition-colors ${isDarkMode ? "text-white" : isScrolled ? "text-black" : "text-white"}`} />
              ) : (
                <Menu className={`w-6 h-6 transition-colors ${isDarkMode ? "text-white" : isScrolled ? "text-black" : "text-white"}`} />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={`md:hidden ${isDarkMode ? "bg-emerald-950/95" : "bg-white/95"} backdrop-blur-xl border-t ${isDarkMode ? "border-emerald-700/50" : "border-gray-200/50"} shadow-2xl`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.div className="px-6 py-6 space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              {[
                { to: "home", label: "Beranda", delay: 0.1 },
                { to: "events", label: "Jadwal", delay: 0.15 },
                { to: "gallery", label: "Galeri", delay: 0.2 },
                { to: "lodging", label: "Penginapan", delay: 0.25 },
                { to: "jalur", label: "Jalur", delay: 0.3 },
              ].map((item) => (
                <motion.div key={item.to} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: item.delay }}>
                  <Link
                    to={item.to}
                    smooth={true}
                    duration={500}
                    offset={item.to === "home" ? -100 : -80}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer group ${
                      isDarkMode ? "text-stone-300 hover:text-amber-400 hover:bg-emerald-800/30" : "text-gray-700 hover:text-amber-600 hover:bg-gray-100/50"
                    }`}
                  >
                    <motion.span whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                      {item.label}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
              <motion.button
                className="w-full mt-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-3 rounded-lg font-semibold relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <span className="relative z-10">Beli Tiket</span>
                <motion.div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-600 opacity-0 group-hover:opacity-100" initial={{ scale: 0 }} whileHover={{ scale: 1 }} transition={{ duration: 0.3 }} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation; 
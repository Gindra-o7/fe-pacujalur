import { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, useAnimation } from "framer-motion";
import { Route, Compass, ArrowRight, Eye, EyeOff } from "lucide-react";
import AuthService from "@/services/api/public/auth.service";
import { saveAuthData } from "@/helpers/auth.helper";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathControls = useAnimation();

  useEffect(() => {
    pathControls.start({
      pathLength: 1,
      transition: { duration: 3, ease: "easeInOut" },
    });
  }, [pathControls]);

  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await AuthService.Login({ email, password });
      if (response.success && response.data.token) {
        saveAuthData(response.data.token, response.data.user);
        toast.success("Login berhasil!");
        navigate("/admin");
      } else {
        toast.error(response.message || "Terjadi kesalahan saat login.");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Email atau password salah.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <pattern id="pathway-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pathway-grid)" />
        </svg>
      </div>

      {/* Animated Path */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <motion.path d="M 0 400 Q 300 200 600 400 T 1200 400" fill="none" stroke="url(#pathGradient)" strokeWidth="3" strokeDasharray="10,5" animate={pathControls} initial={{ pathLength: 0, opacity: 0 }} />
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute top-20 left-20 text-blue-400/20" animate={{ y: [0, -20, 0], rotate: [0, 360, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
          <Compass size={40} />
        </motion.div>
        <motion.div className="absolute top-32 right-32 text-cyan-400/20" animate={{ y: [0, 15, 0], x: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
          <Route size={35} />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen relative z-10 px-4">
        <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 15 }} className="w-full max-w-md">
          <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 shadow-2xl border border-white/20">
            <CardHeader className="text-center pb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
              >
                <Route className="text-white" size={32} />
              </motion.div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Mulai Perjalanan</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">Masukkan kredensial Anda untuk melanjutkan perjalanan menuju dashboard</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-4 pr-4 py-3" />
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="pl-4 pr-12 py-3" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }} className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="remember" className="w-4 h-4" />
                  <label htmlFor="remember" className="text-gray-600">
                    Ingat saya
                  </label>
                </div>
                <button onClick={() => onNavigate("forgot")} className="text-blue-600 hover:underline">
                  Lupa password?
                </button>
              </motion.div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button onClick={handleSubmit} disabled={isLoading} className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Memproses...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Lanjutkan Perjalanan</span>
                    <ArrowRight size={18} />
                  </div>
                )}
              </Button>

              <p className="text-sm text-gray-600 text-center">
                Belum memulai perjalanan?{" "}
                <button onClick={() => onNavigate("register")} className="text-blue-600 hover:underline font-semibold">
                  Daftar sekarang
                </button>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;

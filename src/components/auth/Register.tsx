import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, User, CheckCircle2 } from "lucide-react";

const Register = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!agreeTerms || formData.password !== formData.confirmPassword) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onNavigate("login");
    }, 2000);
  };

  const isFormValid = formData.fullName && formData.email && formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && agreeTerms;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      <div className="flex items-center justify-center min-h-screen relative z-10 px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 shadow-2xl border border-white/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <User className="text-white" size={32} />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Mulai Petualangan</CardTitle>
              <CardDescription>Buat akun baru dan bergabung dalam perjalanan menuju kesuksesan</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nama Lengkap</Label>
                <Input id="fullName" placeholder="Masukkan nama lengkap" value={formData.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="Buat password kuat" value={formData.password} onChange={(e) => handleInputChange("password", e.target.value)} className="pr-12" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Ulangi password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className={formData.confirmPassword && formData.password !== formData.confirmPassword ? "border-red-400" : ""}
                />
                {formData.confirmPassword && (
                  <div className="flex items-center space-x-2 text-xs">
                    {formData.password === formData.confirmPassword ? (
                      <>
                        <CheckCircle2 size={14} className="text-green-500" />
                        <span className="text-green-500">Password cocok</span>
                      </>
                    ) : (
                      <span className="text-red-500">Password tidak cocok</span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-start space-x-3">
                <input type="checkbox" id="terms" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="w-4 h-4 mt-0.5" />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Saya setuju dengan <button className="text-emerald-600 hover:underline">Syarat & Ketentuan</button>
                </label>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button onClick={handleSubmit} disabled={isLoading || !isFormValid} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 disabled:opacity-50">
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Memulai Petualangan...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Mulai Petualangan</span>
                    <ArrowRight size={18} />
                  </div>
                )}
              </Button>

              <p className="text-sm text-gray-600 text-center">
                Sudah punya akun?{" "}
                <button onClick={() => onNavigate("login")} className="text-emerald-600 hover:underline font-semibold">
                  Masuk sekarang
                </button>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;

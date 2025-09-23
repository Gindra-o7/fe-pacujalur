import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";

const ForgotPassword = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <pattern id="recovery-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#recovery-grid)" />
        </svg>
      </div>

      <div className="flex items-center justify-center min-h-screen relative z-10 px-4">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 shadow-2xl border border-white/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center">
                {isSuccess ? <CheckCircle className="text-white" size={32} /> : <Mail className="text-white" size={32} />}
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">{isSuccess ? "Email Terkirim!" : "Pulihkan Jalur"}</CardTitle>
              <CardDescription>{isSuccess ? "Kami telah mengirim link pemulihan ke email Anda." : "Masukkan email Anda untuk menerima instruksi pemulihan"}</CardDescription>
            </CardHeader>

            {!isSuccess ? (
              <>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button onClick={handleSubmit} disabled={isLoading || !email} className="w-full bg-gradient-to-r from-orange-600 to-pink-600">
                    {isLoading ? "Mengirim..." : "Kirim Link Pemulihan"}
                  </Button>
                  <button onClick={() => onNavigate("login")} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mx-auto">
                    <ArrowLeft size={16} />
                    <span>Kembali ke Login</span>
                  </button>
                </CardFooter>
              </>
            ) : (
              <CardFooter>
                <Button onClick={() => onNavigate("login")} className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                  <ArrowLeft size={18} className="mr-2" />
                  Kembali ke Login
                </Button>
              </CardFooter>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;

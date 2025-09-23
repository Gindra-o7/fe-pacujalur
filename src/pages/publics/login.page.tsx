import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoginPage from '@/components/auth/Login';
import ForgotPasswordPage from '@/components/auth/LupaPassword';
import RegisterPage from '@/components/auth/Register';
import { ModeToggle } from '@/components/themes/mode-toggle';

export default function CompleteAuthSystem() {
  const [currentPage, setCurrentPage] = useState('login');
  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleBackToLanding = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
        <button
          onClick={handleBackToLanding}
          className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-200/50 dark:border-gray-700/50"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
          <span className="text-gray-700 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 font-medium transition-colors text-sm">
            Kembali
          </span>
        </button>
        <ModeToggle />
      </div>

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
      
      {/* Konten Halaman yang berganti */}
      <div className="relative z-10">
        {currentPage === 'login' && <LoginPage onNavigate={handleNavigate} />}
        {currentPage === 'forgot' && <ForgotPasswordPage onNavigate={handleNavigate} />}
        {currentPage === 'register' && <RegisterPage onNavigate={handleNavigate} />}
      </div>
    </div>
  );
}
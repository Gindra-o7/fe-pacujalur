import { useState } from 'react';
import LoginPage from '@/components/login/login';
import ForgotPasswordPage from '@/components/login/LupaPassword';
import RegisterPage from '@/components/login/Register';

export default function CompleteAuthSystem() {
  const [currentPage, setCurrentPage] = useState('login');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {currentPage === 'login' && <LoginPage onNavigate={handleNavigate} />}
      {currentPage === 'forgot' && <ForgotPasswordPage onNavigate={handleNavigate} />}
      {currentPage === 'register' && <RegisterPage onNavigate={handleNavigate} />}
    </div>
  );
}
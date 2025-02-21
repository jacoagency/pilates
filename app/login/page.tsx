import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F1] flex flex-col items-center justify-center">
      <Link 
        href="/"
        className="absolute top-8 left-8 text-[#B5A69C] hover:text-[#8A7F76] transition-colors"
      >
        ← Volver al inicio
      </Link>
      <AuthForm mode="login" />
    </div>
  );
} 
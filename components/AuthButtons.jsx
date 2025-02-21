'use client';

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const AuthButtons = () => {
  const { data: session } = useSession();

  return (
    <div className="absolute top-6 right-8 z-20">
      {session ? (
        <div className="flex items-center gap-4">
          <span className="text-[#8A7F76]">
            Hola, {session.user?.name || 'Usuario'}
          </span>
          <button
            onClick={() => signOut()}
            className="px-6 py-2 border border-[#B5A69C] text-[#B5A69C] hover:bg-[#B5A69C] hover:text-white transition-all duration-300 text-sm tracking-wider"
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-6 py-2 border border-[#B5A69C] text-[#B5A69C] hover:bg-[#B5A69C] hover:text-white transition-all duration-300 text-sm tracking-wider"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/register"
            className="px-6 py-2 bg-[#B5A69C] text-white hover:bg-[#8A7F76] transition-all duration-300 text-sm tracking-wider"
          >
            Registrarse
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthButtons; 
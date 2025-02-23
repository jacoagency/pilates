'use client';

import { useSession, signOut } from "next-auth/react";

const DashboardHeader = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-white border-b border-[#B5A69C]/10 fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <span className="text-[#B5A69C] text-xl font-light">
          Reformer Pilates
        </span>
        
        <div className="flex items-center gap-6">
          <span className="text-[#8A7F76]">
            Hola, {session?.user?.name || 'Usuario'}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="px-4 py-2 border border-[#B5A69C] text-[#B5A69C] hover:bg-[#B5A69C] hover:text-white transition-all duration-300 text-sm tracking-wider rounded-md"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 
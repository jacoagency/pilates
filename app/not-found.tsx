import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F5F1] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-light text-[#B5A69C] mb-4">404</h1>
        <h2 className="text-2xl text-[#8A7F76] mb-8 font-light">
          Página no encontrada
        </h2>
        <p className="text-[#8A7F76] mb-8 max-w-md mx-auto">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link 
          href="/"
          className="inline-block px-6 py-3 border border-[#B5A69C] text-[#B5A69C] hover:bg-[#B5A69C] hover:text-white transition-all duration-300 text-sm tracking-wider rounded-md"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
} 
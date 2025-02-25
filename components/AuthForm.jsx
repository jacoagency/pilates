'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from 'react-hot-toast';

const AuthForm = ({ mode = 'login' }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (mode === 'login') {
      try {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res?.error) {
          setError("Credenciales inválidas");
          toast.error("Credenciales inválidas");
          return;
        }

        toast.success("¡Bienvenido de nuevo!");
        if (email === 'ventas@jacoagency.io') {
          router.replace("/panel");
        } else {
          router.replace("/dashboard");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error al iniciar sesión");
      } finally {
        setLoading(false);
      }
    } else {
      const name = formData.get("name");
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });

        if (res.ok) {
          setRedirecting(true);
          toast.success("¡Cuenta creada exitosamente!");
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } else {
          const data = await res.json();
          setError(data.message || "Error al registrar usuario");
          toast.error(data.message || "Error al registrar usuario");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setError("Error al conectar con el servidor");
        toast.error("Error al conectar con el servidor");
        setLoading(false);
      }
    }
  };

  const getButtonText = () => {
    if (mode === 'login') {
      return loading ? "Iniciando sesión..." : "Iniciar Sesión";
    } else {
      if (redirecting) return "Redirigiendo...";
      if (loading) return "Creando cuenta...";
      return "Crear Cuenta";
    }
  };

  return (
    <div className="max-w-md w-full mx-auto px-4">
      <h2 className="text-3xl font-light text-[#B5A69C] mb-8 text-center">
        {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
      </h2>
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="mb-4">
              <label className="block text-[#8A7F76] text-sm mb-2" htmlFor="name">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-3 border border-[#B5A69C]/20 rounded focus:outline-none focus:border-[#B5A69C] transition-colors text-lg text-[#4A4033]"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-[#8A7F76] text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-[#B5A69C]/20 rounded focus:outline-none focus:border-[#B5A69C] transition-colors text-lg text-[#4A4033]"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#8A7F76] text-sm mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 border border-[#B5A69C]/20 rounded focus:outline-none focus:border-[#B5A69C] transition-colors text-lg text-[#4A4033]"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || redirecting}
            className="w-full bg-[#B5A69C] text-white py-3 rounded hover:bg-[#8A7F76] transition-colors disabled:opacity-70"
          >
            {getButtonText()}
          </button>
        </form>
        <p className="mt-6 text-center text-[#8A7F76]">
          {mode === 'login' ? (
            <>
              ¿No tienes una cuenta?{" "}
              <Link href="/register" className="text-[#B5A69C] hover:text-[#8A7F76] transition-colors">
                Regístrate
              </Link>
            </>
          ) : (
            <>
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-[#B5A69C] hover:text-[#8A7F76] transition-colors">
                Inicia Sesión
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthForm; 
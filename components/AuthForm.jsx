'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AuthForm = ({ mode = 'login' }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
          return;
        }

        router.replace("/dashboard");
      } catch (error) {
        console.log(error);
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
          router.push("/login");
        } else {
          const data = await res.json();
          setError(data.message || "Error al registrar usuario");
        }
      } catch (error) {
        console.log(error);
        setError("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
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
                className="w-full p-3 border border-[#B5A69C]/20 rounded focus:outline-none focus:border-[#B5A69C] transition-colors"
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
              className="w-full p-3 border border-[#B5A69C]/20 rounded focus:outline-none focus:border-[#B5A69C] transition-colors"
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
              className="w-full p-3 border border-[#B5A69C]/20 rounded focus:outline-none focus:border-[#B5A69C] transition-colors"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#B5A69C] text-white py-3 rounded hover:bg-[#8A7F76] transition-colors disabled:opacity-70"
          >
            {loading 
              ? (mode === 'login' ? "Iniciando sesión..." : "Creando cuenta...") 
              : (mode === 'login' ? "Iniciar Sesión" : "Crear Cuenta")
            }
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
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AdminHeader from "../../components/AdminHeader";

export default async function AdminPanel() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.email !== 'ventas@jacoagency.io') {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#F8F5F1]">
      <AdminHeader />
      <main className="pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-light text-[#B5A69C] mb-8">
            Panel de Administración
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-light text-[#8A7F76] mb-4">
                Estadísticas Generales
              </h2>
              <div className="space-y-4">
                <div className="p-4 border border-[#B5A69C]/20 rounded">
                  <p className="text-[#B5A69C] font-medium">Total de Usuarios</p>
                  <p className="text-[#8A7F76] text-2xl">150</p>
                </div>
                <div className="p-4 border border-[#B5A69C]/20 rounded">
                  <p className="text-[#B5A69C] font-medium">Clases Programadas</p>
                  <p className="text-[#8A7F76] text-2xl">24</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-light text-[#8A7F76] mb-4">
                Acciones Rápidas
              </h2>
              <div className="space-y-4">
                <button className="w-full p-4 border border-[#B5A69C] text-[#B5A69C] rounded hover:bg-[#B5A69C] hover:text-white transition-colors">
                  Gestionar Usuarios
                </button>
                <button className="w-full p-4 border border-[#B5A69C] text-[#B5A69C] rounded hover:bg-[#B5A69C] hover:text-white transition-colors">
                  Gestionar Clases
                </button>
                <button className="w-full p-4 border border-[#B5A69C] text-[#B5A69C] rounded hover:bg-[#B5A69C] hover:text-white transition-colors">
                  Ver Reportes
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
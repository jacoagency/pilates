import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DashboardHeader from "@/components/DashboardHeader";
import BookingCalendar from '@/components/BookingCalendar';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session.user?.email === 'ventas@jacoagency.io') {
    redirect("/panel");
  }

  return (
    <div className="min-h-screen bg-[#F8F5F1]">
      <DashboardHeader />
      <main className="pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-light text-[#B5A69C] mb-8">
            Bienvenido a tu Dashboard
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <BookingCalendar />

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-light text-[#8A7F76] mb-4">
                Tus Próximas Clases
              </h2>
              <div className="space-y-4">
                <div className="p-4 border border-[#B5A69C]/20 rounded">
                  <p className="text-[#B5A69C] font-medium">Reformer Flow</p>
                  <p className="text-[#8A7F76]">Martes, 10:00 AM</p>
                </div>
                <div className="p-4 border border-[#B5A69C]/20 rounded">
                  <p className="text-[#B5A69C] font-medium">Private Session</p>
                  <p className="text-[#8A7F76]">Jueves, 3:00 PM</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-light text-[#8A7F76] mb-4">
                Tu Progreso
              </h2>
              <div className="space-y-4">
                <div className="p-4 border border-[#B5A69C]/20 rounded">
                  <p className="text-[#B5A69C] font-medium">Clases Completadas</p>
                  <p className="text-[#8A7F76] text-2xl">12</p>
                </div>
                <div className="p-4 border border-[#B5A69C]/20 rounded">
                  <p className="text-[#B5A69C] font-medium">Horas Practicadas</p>
                  <p className="text-[#8A7F76] text-2xl">24</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
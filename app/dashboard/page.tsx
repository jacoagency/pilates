import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DashboardHeader from "@/components/DashboardHeader";
import BookingCalendar from '@/components/BookingCalendar';
import UserBookings from '@/components/UserBookings';

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
            <UserBookings />
          </div>
        </div>
      </main>
    </div>
  );
} 
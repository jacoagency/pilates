import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AdminHeader from "../../components/AdminHeader";
import AdminStats from "../../components/AdminStats";

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
          <AdminStats />
        </div>
      </main>
    </div>
  );
} 
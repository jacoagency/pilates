import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import Booking from "@/models/booking";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.email !== 'ventas@jacoagency.io') {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await connectMongoDB();

    // Obtener total de usuarios (excluyendo al admin)
    const totalUsers = await User.countDocuments({
      email: { $ne: 'ventas@jacoagency.io' }
    });

    // Obtener total de reservas futuras
    const futureBookings = await Booking.countDocuments({
      date: { $gte: new Date() }
    });

    // Obtener lista de usuarios
    const users = await User.find({
      email: { $ne: 'ventas@jacoagency.io' }
    }).select('name email createdAt').sort({ createdAt: -1 });

    // Obtener próximas reservas
    const bookings = await Booking.find({
      date: { $gte: new Date() }
    }).populate('userId', 'name email')
      .sort({ date: 1 })
      .limit(10);

    return NextResponse.json({
      stats: {
        totalUsers,
        futureBookings
      },
      users,
      bookings
    });
  } catch (error) {
    console.error("Error obteniendo estadísticas:", error);
    return NextResponse.json(
      { error: "Error al obtener estadísticas" },
      { status: 500 }
    );
  }
} 
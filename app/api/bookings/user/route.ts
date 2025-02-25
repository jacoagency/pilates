import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectMongoDB } from "@/lib/mongodb";
import Booking from "@/models/booking";
import User from "@/models/user";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await connectMongoDB();

    // Obtener el userId del usuario actual
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    // Obtener las reservas futuras del usuario
    const bookings = await Booking.find({
      userId: user._id,
      date: { $gte: new Date() }
    }).sort({ date: 1, timeSlot: 1 });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error obteniendo reservas:", error);
    return NextResponse.json(
      { error: "Error al obtener las reservas" },
      { status: 500 }
    );
  }
} 
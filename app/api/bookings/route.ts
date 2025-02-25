import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectMongoDB } from "@/lib/mongodb";
import Booking from "@/models/booking";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/models/user";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { date, timeSlot } = await req.json();

    await connectMongoDB();

    // Obtener el userId del usuario actual
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    // Crear fecha combinando la fecha seleccionada con la hora del timeSlot
    const [hours, minutes] = timeSlot.split(':').map(Number);
    const bookingDate = new Date(date);
    bookingDate.setHours(hours, minutes, 0, 0);

    // Verificar disponibilidad
    const existingBookings = await Booking.countDocuments({
      date: bookingDate,
      timeSlot,
    });

    if (existingBookings >= 8) {
      return NextResponse.json(
        { error: "No hay camas disponibles para este horario" },
        { status: 400 }
      );
    }

    // Encontrar una cama disponible
    const bookedBeds = await Booking.find({
      date: bookingDate,
      timeSlot,
    }).distinct('bedNumber');

    let availableBed = 1;
    for (let i = 1; i <= 8; i++) {
      if (!bookedBeds.includes(i)) {
        availableBed = i;
        break;
      }
    }

    // Crear la reserva con la fecha correcta
    const booking = await Booking.create({
      userId: user._id,
      date: bookingDate,
      timeSlot,
      bedNumber: availableBed,
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Error en la reserva:", error);
    return NextResponse.json(
      { error: "Error al procesar la reserva" },
      { status: 500 }
    );
  }
} 
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Booking from "@/models/booking";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');
    const time = searchParams.get('time');

    if (!date || !time) {
      return NextResponse.json(
        { error: "Fecha y hora son requeridas" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Crear fecha con la hora específica para la búsqueda exacta
    const [hours, minutes] = time.split(':').map(Number);
    const searchDate = new Date(date);
    searchDate.setHours(hours, minutes, 0, 0);

    const existingBookings = await Booking.countDocuments({
      date: searchDate,
      timeSlot: time,
    });

    // Siempre son 8 spots disponibles menos los que ya están reservados
    const availableBeds = Math.max(0, 8 - existingBookings);

    return NextResponse.json({ availableBeds });
  } catch (error) {
    console.error("Error checking availability:", error);
    return NextResponse.json(
      { error: "Error al verificar disponibilidad" },
      { status: 500 }
    );
  }
} 
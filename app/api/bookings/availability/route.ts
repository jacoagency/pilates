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

    const existingBookings = await Booking.countDocuments({
      date: new Date(date),
      timeSlot: time,
    });

    const availableBeds = 8 - existingBookings;

    return NextResponse.json({ availableBeds });
  } catch (error) {
    console.error("Error checking availability:", error);
    return NextResponse.json(
      { error: "Error al verificar disponibilidad" },
      { status: 500 }
    );
  }
} 
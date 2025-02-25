import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectMongoDB } from "@/lib/mongodb";
import Booking from "@/models/booking";
import User from "@/models/user";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    // Verificar que la reserva existe y pertenece al usuario
    const booking = await Booking.findOne({
      _id: params.id,
      userId: user._id,
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Reserva no encontrada" },
        { status: 404 }
      );
    }

    // Verificar que la reserva no sea del pasado
    if (new Date(booking.date) < new Date()) {
      return NextResponse.json(
        { error: "No se pueden cancelar reservas pasadas" },
        { status: 400 }
      );
    }

    // Cancelar la reserva
    await Booking.deleteOne({ _id: params.id });

    return NextResponse.json({ message: "Reserva cancelada exitosamente" });
  } catch (error) {
    console.error("Error cancelando la reserva:", error);
    return NextResponse.json(
      { error: "Error al cancelar la reserva" },
      { status: 500 }
    );
  }
} 
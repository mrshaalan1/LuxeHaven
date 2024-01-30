import connect from "@/dbConfig/dbConfig";
import Reservation from "@/models/reservationModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const allReservations = await Reservation.find();

    return NextResponse.json(
      { reservations: allReservations },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

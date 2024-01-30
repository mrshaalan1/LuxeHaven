import connect from "@/dbConfig/dbConfig";
import Reservation from "@/models/reservationModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

      const userReservations = await Reservation.find({
        customer: userId,
      });

      return NextResponse.json(
        { reservations: userReservations },
        { status: 200 }
      );
    } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

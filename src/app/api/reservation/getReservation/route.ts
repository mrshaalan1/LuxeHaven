import Reservation from "@/models/reservationModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { ReservationId } = reqBody;
    //console.log(reqBody);

    const reservation = await Reservation.findOne({ _id: ReservationId });

    //console.log(reservation);

    return NextResponse.json({
      reservation,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

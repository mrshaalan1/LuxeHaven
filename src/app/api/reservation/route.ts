import connect from "@/dbConfig/dbConfig";
import Reservation from "@/models/reservationModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Room from "@/models/roomModel";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "Missing userId parameter" },
        { status: 400 }
      );
    }

    const reservations = await Reservation.find({ customer: userId });

    return NextResponse.json(reservations);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Reservation from "@/models/reservationModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);

    if (typeof decodedToken !== "string") {
      const userReservations = await Reservation.find({
        customer: decodedToken.id,
      });
      return NextResponse.json(
        { reservations: userReservations },
        { status: 200 }
      );
    } else {
      console.log("Invalid token");
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

import connect from "@/dbConfig/dbConfig";
import Reservation from "@/models/reservationModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Room from "@/models/roomModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { roomType, checkInDate, checkOutDate, spa, gym, token } = reqBody;

    // Verify token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);
    let userId;
    if (typeof decodedToken !== "string") {
      userId = decodedToken.id;
    } else {
      throw new Error("Invalid token");
    }

    // Find room by type
    const room = await Room.findOne({ RoomType: roomType });
    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 400 });
    }

    // Create reservation
    const reservation = new Reservation({
      customer: userId,
      room: room._id,
      reservationFrom: checkInDate,
      reservationTo: checkOutDate,
      spa: spa,
      gym: gym,
    });

    await reservation.save();

    return NextResponse.json({ message: "Reservation successful" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

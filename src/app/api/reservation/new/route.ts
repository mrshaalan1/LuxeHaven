import connect from "@/dbConfig/dbConfig";
import Reservation from "@/models/reservationModel";
import Room from "@/models/roomModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { roomType, checkInDate, checkOutDate, spa, gym, token } = reqBody;

    console.log(reqBody);

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);

    let userId;

    if (typeof decodedToken !== "string") {
      userId = decodedToken.id;
    } else {
      return reqBody.status(401).send({ message: "Invalid token" });
    }
    console.log(userId);

    const room = await Room.findOne({ RoomType: roomType });
    if (!room) {
      return reqBody.status(404).send({ message: "Room not found" });
    }

    const reservation = new Reservation({
      customer: userId,
      room: room._id,
      reservationFrom: checkInDate,
      reservationTo: checkOutDate,
      spa: spa,
      gym: gym,
    });

    try {
      await reservation.save();
    } catch (err) {
      console.error(err);
      return reqBody.status(500).send({ message: "Error saving reservation" });
    }

    return NextResponse.json(
      { message: "Reservation Successful" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


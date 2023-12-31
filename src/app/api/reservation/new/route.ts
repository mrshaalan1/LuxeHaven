import connect from "@/dbConfig/dbConfig";
import Reservation from "@/models/reservationModel";
import Room from "@/models/roomModel";
import Car from "@/models/carModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      roomType,
      car,
      checkInDate,
      checkOutDate,
      spa,
      gym,
      token,
      carRentalFrom,
      carRentalTo,
    } = reqBody;

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);

    let userId;

    if (typeof decodedToken !== "string") {
      userId = decodedToken.id;
    } else {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    let existingRoomReservation = null;
    if (roomType) {
      existingRoomReservation = await Reservation.findOne({
        customer: userId,
        room: { $ne: null },
      });
      if (existingRoomReservation) {
        return NextResponse.json(
          { message: "User already has a room reservation" },
          { status: 400 }
        );
      }
    }

    // Check if user already has any car reservation
    const existingCarReservation = await Reservation.findOne({
      customer: userId,
      CarId: { $ne: null },
    });

    if (existingCarReservation) {
      return NextResponse.json(
        { message: "User already has a car reservation" },
        { status: 400 }
      );
    }

    const room = roomType ? await Room.findOne({ RoomType: roomType }) : null;
    if (roomType && !room) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }

    const reservation = new Reservation({
      customer: userId,
      CarId: car,
      room: room ? room._id : null,
      reservationFrom: checkInDate,
      reservationTo: checkOutDate,
      CarRentalFrom: carRentalFrom,
      CarRentalTo: carRentalTo,
      spa: spa,
      gym: gym,
    });

    try {
      await reservation.save();
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { message: "Error saving reservation" },
        { status: 500 }
      );
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

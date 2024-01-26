import connect from "@/dbConfig/dbConfig";
import Reservation from "@/models/reservationModel";
import Room from "@/models/roomModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);
    
    const {
      RoomId,
      roomType,
      car,
      checkInDate,
      checkOutDate,
      spa,
      gym,
      carRentalFrom,
      carRentalTo,
    } = reqBody;

    const checkInDateObj = new Date(checkInDate);
    const checkOutDateObj = new Date(checkOutDate);
    const carRentalFromObj = new Date(carRentalFrom);
    const carRentalToObj = new Date(carRentalTo);

    const userId:any = await getDataFromToken(request);

    // Check if the user is trying to rent a car before reserving a room
    if (car && !roomType) {
      return NextResponse.json(
        { message: "User must reserve a room before renting a car" },
        { status: 405 }
      );
    }

    // Check if the user already reserved a car
    const existingCarReservation = await Reservation.findOne({
      customer: userId,
      CarId: { $ne: null },
    });

    if (existingCarReservation) {
      return NextResponse.json(
        { message: "User already reserved a car" },
        { status: 405 }
      );
    }
    
    // Check if the user already reserved a room
    const existingRoomReservation = await Reservation.findOne({
      customer: userId,
    });

    if (existingRoomReservation) {
      return NextResponse.json(
        { message: "User already reserved a room" },
        { status: 405 }
      );
    }

    // Check if car rental period is within the room reservation period
    if (
      (carRentalFromObj < checkInDateObj || carRentalToObj > checkOutDateObj) &&
      roomType
    ) {
      return NextResponse.json(
        {
          message:
            "Car rental period cannot be outside the room reservation period",
        },
        { status: 406 }
      );
    }

    // Check if the user already has a reservation
    const existingReservation = await Reservation.findOne({ customer: userId });

    if (existingReservation) {
      return NextResponse.json(
        { message: "User already has a reservation" },
        { status: 400 }
      );
    }

    // Check if the room exists
    const room = roomType ? await Room.findOne({ RoomType: roomType }) : null;
    if (roomType && !room) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }
    const roomIdAsString = RoomId.toString();


    // Create or update the reservation
    try {
      if (existingRoomReservation) {
        existingRoomReservation.carReservation = {
          CarId: car,
          CarRentalFrom: carRentalFrom,
          CarRentalTo: carRentalTo,
        };
        await existingRoomReservation.save();
      } else {
        const reservation = new Reservation({
          customer: userId,
          RoomId: roomIdAsString,
          reservationFrom: checkInDate,
          reservationTo: checkOutDate,
          spa: spa,
          gym: gym,
          carReservation: {
            CarId: car,
            CarRentalFrom: carRentalFrom,
            CarRentalTo: carRentalTo,
          },
        });
        await reservation.save();
      }
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

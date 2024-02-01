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

    const userId: any = await getDataFromToken(request);

    const existingRoomReservations = await Reservation.find({
      customer: userId,
      RoomId: { $exists: true },
    });

    // Check if the new reservation period overlaps with any existing room reservation period
    const isOverlap = existingRoomReservations.some((reservation) =>
      checkDateOverlap(
        new Date(reservation.reservationFrom),
        new Date(reservation.reservationTo),
        new Date(checkInDate),
        new Date(checkOutDate)
      )
    );

    if (isOverlap) {
      // If there is an overlap with any room reservation, return an error
      return NextResponse.json(
        {
          message:
            "New reservation period must not overlap with existing room reservations",
        },
        { status: 405 }
      );
    }

    // Find the room reservation that matches the car rental period
    const matchingRoomReservation = existingRoomReservations.find(
      (reservation) =>
        checkDateOverlap(
          new Date(reservation.reservationFrom),
          new Date(reservation.reservationTo),
          new Date(carRentalFrom),
          new Date(carRentalTo)
        )
    );

    console.log("matching: " + matchingRoomReservation);

    if (matchingRoomReservation) {
      console.log("1");

      // Update the existing room reservation to include car reservation details
      matchingRoomReservation.carReservation = {
        CarId: car,
        CarRentalFrom: carRentalFrom,
        CarRentalTo: carRentalTo,
      };

      await matchingRoomReservation.save();

      return NextResponse.json(
        { message: "Car reservation added to existing room reservation" },
        { status: 200 }
      );
    } else {
      // If no matching room reservation is found, create a new room reservation
      // Check if the room exists
      const room = roomType ? await Room.findOne({ RoomType: roomType }) : null;
      if (roomType && !room) {
        return NextResponse.json(
          { message: "Room not found" },
          { status: 404 }
        );
      }

      const roomIdAsString = RoomId?.toString();

      // Create a new room reservation with room and car details
      if (roomIdAsString) {
        const newRoomReservation = new Reservation({
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

        await newRoomReservation.save();

        return NextResponse.json(
          { message: "Room reservation with car details created" },
          { status: 200 }
        );
      } else {
        // Handle the case where the room does not exist
        return NextResponse.json(
          { message: "Room not found" },
          { status: 406  }
        );
      }
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function checkDateOverlap(
  startDate1: Date,
  endDate1: Date,
  startDate2: Date,
  endDate2: Date
): boolean {
  return (
    (startDate1 <= startDate2 && startDate2 < endDate1) ||
    (startDate1 < endDate2 && endDate2 <= endDate1) ||
    (startDate2 <= startDate1 && startDate1 < endDate2) ||
    (startDate2 < endDate1 && endDate1 <= endDate2)
  );
}

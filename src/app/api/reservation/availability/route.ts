import connect from "@/dbConfig/dbConfig";
import Reservation from "@/models/reservationModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      RoomId,
      reservationId,
      reservationType,
      checkInDate,
      checkOutDate,
      car,
      carRentalFrom,
      carRentalTo,
    } = reqBody;
    console.log(reqBody);

    const query = {
      $or: [
        {
          // Check for overlapping reservations for the specified room
          RoomId,
          reservationFrom: { $lt: checkOutDate },
          reservationTo: { $gt: checkInDate },
        },
        {
          // Check for overlapping reservations for the specified car
          "carReservation.CarId": car,
          "carReservation.CarRentalFrom": { $lt: carRentalTo },
          "carReservation.CarRentalTo": { $gt: carRentalFrom },
        },
      ],
    };

    const overlappingReservations = await Reservation.find(query);

    if (overlappingReservations.length === 0) {
      return NextResponse.json({ status: "Available" }, { status: 200 });
    } else {
      return NextResponse.json({ status: "Not Available" }, { status: 200 });
    }
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

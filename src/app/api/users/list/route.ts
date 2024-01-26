import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
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

export async function DELETE(request: NextRequest) {
  try {
   const reqBody = await request.json();
   const { reservationId, reservationType } = reqBody;
 
   if (reservationType === 'room') {
     await Reservation.updateOne(
       { _id: reservationId },
       { $unset: { RoomId: "" } }
     );
   } else if (reservationType === 'car') {
     await Reservation.updateOne(
       { _id: reservationId },
       { $unset: { CarId: "" } }
     );
   }
 
   return NextResponse.json({ message: "Reservation deleted successfully" }, { status: 200 });
  } catch (error: any) {
   console.error("Error:", error);
   return NextResponse.json({ message: error }, { status: 500 });
  }
 }
 

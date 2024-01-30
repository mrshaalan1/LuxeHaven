import connect from "@/dbConfig/dbConfig";
import Reservation from "@/models/reservationModel";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function DELETE(request: NextRequest) {
    try {
      const reqBody = await request.json();
      const { reservationId, reservationType } = reqBody;
      console.log(reqBody);
      
  
      if (reservationType === 'room') {
        await Reservation.deleteOne({ _id: reservationId });
      } else if (reservationType === 'car') {
        const reservation = await Reservation.findOne({ _id: reservationId });
        if (reservation) {
          reservation.carReservation = undefined;
          await reservation.save();
        }
      }
  
      return NextResponse.json({ message: "Reservation deleted successfully" }, { status: 200 });
    } catch (error: any) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  

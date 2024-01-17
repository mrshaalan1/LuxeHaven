import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Reservation from "@/models/reservationModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function DELETE(request: NextRequest) {
    try {
        console.log("1");
        
     const reqBody = await request.json();
     const { reservationId, reservationType } = reqBody;
     console.log("2");

     if (reservationType === 'room') {
        console.log("r");

       await Reservation.updateOne(
         { _id: reservationId },
         { $unset: { RoomId: "" } }
       );
     } else if (reservationType === 'car') {
        console.log("c");

       await Reservation.updateOne(
         { _id: reservationId },
         { $unset: { CarId: "" } }
       );
     }
     console.log("y");

     return NextResponse.json({ message: "Reservation deleted successfully" }, { status: 200 });
    } catch (error: any) {
        console.log("e");

     console.error("Error:", error);
     return NextResponse.json({ message: error }, { status: 500 });
    }
   }
   
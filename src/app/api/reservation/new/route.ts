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
     RoomId,
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

   const checkInDateObj = new Date(checkInDate);
   const checkOutDateObj = new Date(checkOutDate);
   const carRentalFromObj = new Date(carRentalFrom);
   const carRentalToObj = new Date(carRentalTo);

   const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);

   let userId;

   if (typeof decodedToken !== "string") {
     userId = decodedToken.id;
   } else {
     return NextResponse.json({ message: "Invalid token" }, { status: 401 });
   }

   let existingRoomReservation = await Reservation.findOne({
     customer: userId,
     RoomId: { $ne: null },
   });

   let hasRoomReservation = false;
   if (roomType) {
     existingRoomReservation = await Reservation.findOne({
       customer: userId,
       RoomId: { $ne: null },
     });
     if (existingRoomReservation) {
       hasRoomReservation = true;
     }
   }

   if (existingRoomReservation && car) {
     existingRoomReservation.CarId = car;
     existingRoomReservation.CarRentalFrom = carRentalFrom;
     existingRoomReservation.CarRentalTo = carRentalTo;
   }

   // Check if user already has any car reservation
   const existingCarReservation = await Reservation.findOne({
     customer: userId,
     CarId: { $ne: null },
   });

   if (existingCarReservation && !hasRoomReservation) {
     return NextResponse.json(
       { message: "User must have a Room reservation before renting a Car" },
       { status: 405 }
     );
   }

   if (carRentalFromObj < checkInDateObj || carRentalToObj > checkOutDateObj) {
     return NextResponse.json(
       {
         message:
           "Car rental period cannot be outside the room reservation period",
       },
       { status: 406 }
     );
   }

   const room = roomType ? await Room.findOne({ RoomType: roomType }) : null;
   if (roomType && !room) {
     return NextResponse.json({ message: "Room not found" }, { status: 404 });
   }

   const reservation = new Reservation({
     customer: userId,
     RoomId: RoomId,
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

   try {
    if (existingRoomReservation) {
      // Update only the car reservation part of the existing room reservation
      existingRoomReservation.carReservation = {
        CarId: car,
        CarRentalFrom: carRentalFrom,
        CarRentalTo: carRentalTo,
      };
      await existingRoomReservation.save();
     } else {
      const reservation = new Reservation({
        customer: userId,
        RoomId: RoomId,
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

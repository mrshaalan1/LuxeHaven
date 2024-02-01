import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import Reservation from "@/models/reservationModel";

connect();

export const POST = async (request: any) => {
  const requestBody = await request.json();

  const { RoomId, checkInDate, checkOutDate, spa, gym, ReservationId } =
    requestBody;

  Response;

  try {
    const reservation = await Reservation.findOne({ _id: ReservationId });

    if (!reservation) {
      return NextResponse.json("Reservation Not Found", { status: 404 });
    }

    const roomIdAsString = RoomId?.toString();

    if (RoomId) reservation.RoomId = roomIdAsString;
    if (checkInDate) reservation.reservationFrom = checkInDate;
    if (checkOutDate) reservation.reservationTo = checkOutDate;
    if (spa) reservation.spa = spa;
    if (gym) reservation.gym = gym;

    await reservation.save();

    return NextResponse.json("Successfully updated the Reservation", {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
};

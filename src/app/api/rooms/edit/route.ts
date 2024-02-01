import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import Room from "@/models/roomModel";

connect();

export const POST = async (request: any) => {
  const requestBody = await request.json();

  const {RoomId, RoomType, RoomDescription, RoomNumber, RoomPrice } =
    requestBody;
console.log(requestBody);

  Response;

  try {
    const room = await Room.findOne({ _id: RoomId });

    if (!room) {
      return NextResponse.json("Room Not Found", { status: 404 });
    }

    const roomIdAsString = RoomId?.toString();

    if (RoomId) room.RoomId = roomIdAsString;
    if (RoomType) room.RoomType = RoomType;
    if (RoomDescription) room.RoomDescription = RoomDescription;
    if (RoomNumber) room.RoomNumber = RoomNumber;
    if (RoomPrice) room.RoomPrice = RoomPrice;

    await room.save();

    return NextResponse.json("Successfully updated the Room", {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
};

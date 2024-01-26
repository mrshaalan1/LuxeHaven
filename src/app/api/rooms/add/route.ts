import { NextRequest, NextResponse } from "next/server";
import Room from "../../../../models/roomModel";
import connect from "@/dbConfig/dbConfig";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const {
      RoomType,
      RoomPrice,
      RoomDescription,
      RoomPicUrl,
      RoomNumber,
    } = reqBody;
    const newRoom = new Room({
      RoomType,
      RoomPrice,
      RoomDescription,
      RoomPicUrl,
      RoomNumber,
    });

    await newRoom.save();
    return NextResponse.json({
      message: "Room created successfully",
      success: true,
      newRoom,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

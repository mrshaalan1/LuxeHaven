import Room from "../../../../models/roomModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
 try {
  const RoomId = Number(request.nextUrl.pathname.split('/').pop()) || undefined;
   const room = await Room.findOne({RoomId : RoomId});
 
 return NextResponse.json({
   room
 });
 } catch (error: any) {
 console.log(error);
 return NextResponse.json({ error: error.message }, { status: 400 });
 }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      RoomId,
    } = reqBody;

    const room = await Room.findOne({RoomId : RoomId});

    return NextResponse.json({
      message: "Room created successfully",
      success: true,
      room,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
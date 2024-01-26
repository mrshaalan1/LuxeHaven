import Room from "../../../../models/roomModel";
import Reservation from "../../../../models/reservationModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
 try {
  const RoomId = Number(request.nextUrl.pathname.split('/').pop()) || undefined;
   const room = await Room.findOne({RoomId : RoomId}, "RoomPicUrl RoomType RoomNumber");
 
 return NextResponse.json({
   room
 });
 } catch (error: any) {
 console.log(error);
 return NextResponse.json({ error: error.message }, { status: 400 });
 }
}

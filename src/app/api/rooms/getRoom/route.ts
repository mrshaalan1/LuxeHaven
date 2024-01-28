import Room from "../../../../models/roomModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { RoomId } = reqBody;
    //console.log(reqBody);
    

    const room = await Room.findOne({ _id: RoomId });

    //console.log(room);
    

    return NextResponse.json({
      room,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import Room from "../../../../models/roomModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const room = await Room.find({}, "-_id");
    return NextResponse.json({
      room,
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
import connect from "@/dbConfig/dbConfig";
import Room from "@/models/roomModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function DELETE(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { RoomId } = reqBody;
    console.log(reqBody);

    await Room.deleteOne({ _id: RoomId });

    return NextResponse.json(
      { message: "Room Deleted Successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

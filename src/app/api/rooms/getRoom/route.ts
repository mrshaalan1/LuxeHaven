import Room from "../../../../models/roomModel";
import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { RoomId } = reqBody;
    const filename = `${RoomId}.png`;
    const filePath = path.join(process.cwd(), "public", "imageCache", filename);

    let room;

    if (fs.existsSync(filePath)) {
      room = await Room.findOne({ _id: RoomId }, "-RoomPic");
    } else {
      room = await Room.findOne({ _id: RoomId });
    }

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, room.RoomPic, "base64");
    }

    const cachedImage = {
      ...room.toObject(),
      cachedImagePath: `/imageCache/${filename}`,
    };
    return NextResponse.json({ room: cachedImage });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

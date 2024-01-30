import fs from 'fs';
import path from 'path';
import Room from "@/models/roomModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const roomIDs = await Room.find({}, '_id').lean();

    const allImagesCached = roomIDs.every(item => {
      const filename = `${item._id}.png`;
      const filePath = path.join(process.cwd(), 'public', 'imageCache', filename);
      return fs.existsSync(filePath);
    });

    let room;

    if (allImagesCached) {
      room = await Room.find({}, "-RoomPic");
    } else {
      room = await Room.find({});

    }

    const cachedImages = [];

    for (const item of room) {
      const filename = `${item._id}.png`;
      const filePath = path.join(process.cwd(), 'public', 'imageCache', filename);

      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, item.RoomPic, 'base64');
      }

      cachedImages.push({
        ...item.toObject(),
        cachedImagePath: `/imageCache/${filename}`,
      });
    }

    return NextResponse.json({ room: cachedImages });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

import fs from 'fs';
import path from 'path';
import Car from "@/models/carModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const carIDs = await Car.find({}, '_id').lean();

    const allImagesCached = carIDs.every(item => {
      const filename = `${item._id}.png`;
      const filePath = path.join(process.cwd(), 'public', 'imageCache', filename);
      return fs.existsSync(filePath);
    });

    let car;

    if (allImagesCached) {
      car = await Car.find({}, "-CarPic");
    } else {
      car = await Car.find({});

    }

    const cachedImages = [];

    for (const item of car) {
      const filename = `${item._id}.png`;
      const filePath = path.join(process.cwd(), 'public', 'imageCache', filename);

      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, item.CarPic, 'base64');
      }

      cachedImages.push({
        ...item.toObject(),
        cachedImagePath: `/imageCache/${filename}`,
      });
    }

    return NextResponse.json({ car: cachedImages });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

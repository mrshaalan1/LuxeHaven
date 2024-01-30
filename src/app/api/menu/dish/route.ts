import fs from 'fs';
import path from 'path';
import Menu from "../../../../models/menuModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const dishIDs = await Menu.find({}, '_id').lean();

    const allImagesCached = dishIDs.every(item => {
      const filename = `${item._id}.png`;
      const filePath = path.join(process.cwd(), 'public', 'imageCache', filename);
      return fs.existsSync(filePath);
    });

    let dish;

    if (allImagesCached) {
      dish = await Menu.find({}, "-RestaurantItempPic");
    } else {
      dish = await Menu.find({});

    }

    const cachedImages = [];

    for (const item of dish) {
      const filename = `${item._id}.png`;
      const filePath = path.join(process.cwd(), 'public', 'imageCache', filename);

      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, item.RestaurantItempPic, 'base64');
      }

      cachedImages.push({
        ...item.toObject(),
        cachedImagePath: `/imageCache/${filename}`,
      });
    }

    return NextResponse.json({ dish: cachedImages });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

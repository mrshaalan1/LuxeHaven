import Car from "@/models/carModel";
import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { CarId } = reqBody;
    const filename = `${CarId}.png`;
    const filePath = path.join(process.cwd(), "public", "imageCache", filename);

    let car;

    if (fs.existsSync(filePath)) {
      car = await Car.findOne({ _id: CarId }, "-CarPic");
    } else {
      car = await Car.findOne({ _id: CarId });
    }

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, car.CarPic, "base64");
    }

    const cachedImage = {
      ...car.toObject(),
      cachedImagePath: `/imageCache/${filename}`,
    };
    return NextResponse.json({ car: cachedImage });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

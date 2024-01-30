import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from "next/server";
import Car from "../../../../../models/carModel";

export async function GET(request: NextRequest) {
  try {
    const carId = request.nextUrl.pathname.split('/').pop();


    const filename = `${carId}.png`;
    const filePath = path.join(process.cwd(), 'public', 'imageCache', filename);

    let car;

    if (fs.existsSync(filePath)) {
      car = await Car.findOne({ _id: carId }, "-CarPic");
    }
    else{
      car = await Car.findOne({ _id: carId });
    }
    //console.log(car);
    

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, car.CarPic, "base64");
    }
    const cachedImage = {
      ...car.toObject(),
      cachedImagePath: `/imageCache/${filename}`,
    };

    return NextResponse.json({ car: cachedImage });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import Car from "../../../../../models/carModel";
import connect from "@/dbConfig/dbConfig";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { CarName, CarDescription, CarBrand, CarPrice, CarPic } = reqBody;
    const newCar = new Car({
      CarName,
      CarDescription,
      CarBrand,
      CarPrice,
      CarPic,
    });
    
    await newCar.save();
    return (NextResponse.json({
        message: "Car created successfully",
        success: true,
        newCar,
      }));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

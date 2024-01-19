import { NextRequest, NextResponse } from "next/server";
import Car from "../../../../../models/carModel";

export async function GET(request: NextRequest) {
  try {
    const carId = request.nextUrl.pathname.split('/').pop();
    const car = await Car.findOne({ _id: carId });
    
    if (!car) {
      throw new Error("Car not found");
    }
    return NextResponse.json({
      car,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

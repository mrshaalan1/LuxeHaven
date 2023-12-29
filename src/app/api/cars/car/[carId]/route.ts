import { NextRequest, NextResponse } from "next/server";
import Car from "../../../../../models/carModel";

export async function GET(request: NextRequest) {
  try {
    const carId = Number(request.nextUrl.pathname.split('/').pop()) || undefined;
    const car = await Car.findOne({ CarId: carId }, "-_id");
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

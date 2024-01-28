import Car from "../../../../../models/carModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { CarId } = reqBody;
    //console.log(reqBody);
    

    const car = await Car.findOne({ _id: CarId });

    //console.log(car);
    

    return NextResponse.json({
      car,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

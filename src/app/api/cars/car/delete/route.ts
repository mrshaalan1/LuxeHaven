import connect from "@/dbConfig/dbConfig";
import Car from "@/models/carModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function DELETE(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { CarId } = reqBody;
    console.log(reqBody);

    await Car.deleteOne({ _id: CarId });

    return NextResponse.json(
      { message: "Car Deleted Successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

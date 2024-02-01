import Menu from "@/models/menuModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { DishId } = reqBody;
    console.log(reqBody);
    

    const dish = await Menu.findOne({ _id: DishId }, "-RestaurantItempPic");

    console.log(dish);
    

    return NextResponse.json({
        dish,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

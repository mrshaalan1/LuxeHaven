import { NextRequest, NextResponse } from "next/server";
import Menu from "../../../../../models/menuModel";
import connect from "@/dbConfig/dbConfig";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const {
      RestaurantItemName,
      RestaurantItemIngredient,
      RestaurantItemType,
      RestaurantItemPrice,
      RestaurantItempPic,
    } = reqBody;
    const newDish = new Menu({
      RestaurantItemName,
      RestaurantItemIngredient,
      RestaurantItemType,
      RestaurantItemPrice,
      RestaurantItempPic,
    });

    await newDish.save();
    return NextResponse.json({
      message: "Dish created successfully",
      success: true,
      newDish,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import Menu from "../../../../../models/menuModel";

export async function GET(request:NextRequest){
  try {
  const dishId = request.nextUrl.pathname.split('/').pop();
  const dish = await Menu.findOne({RestaurantItemId: dishId}, "-_id");
  if (!dish) {
    throw new Error("Dish not found");
  }
  return NextResponse.json({
    dish
  });
  } catch (error:any) {
  console.log(error);
  return NextResponse.json({error: error.message}, {status: 400});
  }
 }
 
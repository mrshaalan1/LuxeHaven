import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import Menu from "@/models/menuModel";

connect();

export const POST = async (request: any) => {
  const requestBody = await request.json();

  const {RestaurantItemId, RestaurantItemName, RestaurantItemIngredient, RestaurantItemType, RestaurantItemPrice } =
    requestBody;
console.log(requestBody);

  Response;

  try {
    const dish = await Menu.findOne({ _id: RestaurantItemId });

    if (!dish) {
      return NextResponse.json("Dish Not Found", { status: 404 });
    }

    const dishIdAsString = RestaurantItemId?.toString();

    if (RestaurantItemId) dish.RestaurantItemId = dishIdAsString;
    if (RestaurantItemName) dish.RestaurantItemName = RestaurantItemName;
    if (RestaurantItemIngredient) dish.RestaurantItemIngredient = RestaurantItemIngredient;
    if (RestaurantItemType) dish.RestaurantItemType = RestaurantItemType;
    if (RestaurantItemPrice) dish.RestaurantItemPrice = RestaurantItemPrice;

    await dish.save();

    return NextResponse.json("Successfully updated the Dish", {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
};

// pages/api/orders.js
import connect from "@/dbConfig/dbConfig";
import Order from "@/models/cartModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect(); // Connect to the database

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { items, totalPrice } = reqBody;
    const userId: any = await getDataFromToken(request);
    const order = new Order({
      userId,
      items,
      totalPrice,
    });

    await order.save();

    return NextResponse.json({
      message: "Order saved successfully",
      success: true,
      order,
    });
  } catch (error: any) {
    console.error("Error saving order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

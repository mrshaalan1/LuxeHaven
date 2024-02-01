import connect from "@/dbConfig/dbConfig";
import Cart from "@/models/cartModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const userCart = await Cart.find({userId : userId});
    //console.log(userCart);
    
    if (!userCart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    return NextResponse.json({ cart: userCart }, { status: 200 });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

import connect from "@/dbConfig/dbConfig";
import Menu from "@/models/menuModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function DELETE(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { DishId } = reqBody;
    console.log(reqBody);

    await Menu.deleteOne({ _id: DishId });

    return NextResponse.json(
      { message: "Dish Deleted Successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

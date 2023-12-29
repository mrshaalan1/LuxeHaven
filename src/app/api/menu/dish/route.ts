import Menu from "../../../../models/menuModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){
 try {
   const dish = await Menu.find({}, "-_id");
   return NextResponse.json({
    dish
})
 } catch (error:any) {
   console.log(error);

   return NextResponse.json({error: error.message}, {status: 400});
}

}

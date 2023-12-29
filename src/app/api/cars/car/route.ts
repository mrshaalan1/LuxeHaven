import Car from "../../../../models/carModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){
 try {
   const car = await Car.find({}, "-_id");
   return NextResponse.json({
   car
})
 } catch (error:any) {
   console.log(error);

   return NextResponse.json({error: error.message}, {status: 400});
}

}

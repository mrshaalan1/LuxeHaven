import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export const POST = async (request: any) => {
    const requestBody = await request.json();
    
    const { OldPassword, NewPassword, FirstName, LastName, profilepic, PhoneNumber } =
    requestBody;
    
    Response;
    
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("+Password");
        
        if (!user) {
            return NextResponse.json("User Not Found", { status: 404 });
        }
        if (OldPassword === "")
        return NextResponse.json("Old Password Missing!", { status: 500 });
    
        
    const passwordMatch = await bcryptjs.compare(OldPassword, user.Password);
        
    if (!passwordMatch) {
        console.log("Password doesn't match");
        
        return NextResponse.json("Password doesn't match!", { status: 500 });
    }    
    const salt = await bcryptjs.genSalt(10);
    if (FirstName) user.FirstName = FirstName;
    if (LastName) user.LastName = LastName;    
    if (profilepic) user.ProfilePicrute = profilepic;
    if (NewPassword) user.Password = await bcryptjs.hash(NewPassword, salt);
    if (PhoneNumber) user.PhoneNumber = PhoneNumber;

    await user.save();

    return NextResponse.json("Successfully updated the Profile", {
        status: 200,
    });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(error, { status: 500 });
  }
};

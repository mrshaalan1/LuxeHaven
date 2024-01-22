import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export const POST = async (request: any) => {
    const requestBody = await request.json();
    //console.log('Request body:', requestBody);
    
    const { OldPassword, NewPassword, FirstName, LastName, profilepic, PhoneNumber } =
    requestBody;
    
    Response;
    
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("+Password");
        // console.log(FirstName);
        // console.log(LastName);  
        // console.log(OldPassword);
        // console.log(NewPassword);
        //console.log(profilepic);
        
        if (!user) {
            return NextResponse.json("User Not Found", { status: 404 });
        }
        
        if (OldPassword === "")
        return NextResponse.json("Old Password Missing!", { status: 500 });
    
        
    const passwordMatch = await bcryptjs.compare(OldPassword, user.Password);
    
    //console.log(passwordMatch);
    
    if (!passwordMatch) {
        console.log("Password doesn't match");
        
        return NextResponse.json("Password doesn't match!", { status: 500 });
    }
    //console.log("1");
    
    if (FirstName) user.FirstName = FirstName;

    //console.log("2");

    if (LastName) user.LastName = LastName;

    //console.log("3");
    
    if (profilepic) user.ProfilePicrute = profilepic;
    
    const salt = await bcryptjs.genSalt(10);
    
    if (NewPassword) user.Password = await bcryptjs.hash(NewPassword, salt);

    //console.log("4");

    if (PhoneNumber) user.PhoneNumber = PhoneNumber;

    //console.log("5");

    
    await user.save();

    //console.log("6");

    return NextResponse.json("Successfully updated the Profile", {
        status: 200,
    });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(error, { status: 500 });
  }
};

import connect from "../../../../dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    console.log("1");
    
    const reqBody = await request.json();
    console.log(reqBody);
    
    const { Email ,Password,} = reqBody;
    const user = await User.findOne({ Email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(Password, salt);

    const newUser = new User({
      Email,
      Password: hashedPassword,
      Role: "ADMIN",
      isVerfied:"true",
     });
          
     const savedUser = await newUser.save();
     console.log(savedUser);
    
    return (NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    }));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

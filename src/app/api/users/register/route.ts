import connect from "../../../../dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { FirstName,
      LastName,
      Email,
      Password,
      Username,
      PhoneNumber, } = reqBody;

    console.log(reqBody);

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
      FirstName,
      LastName,
      Email,
      Password: hashedPassword,
      Username,
      PhoneNumber,
      Role: "USER",
     });
          
     const savedUser = await newUser.save();
     console.log(savedUser);
     
     newUser.save().then((savedUser: { _id: any; }) => {
      console.log(savedUser);
     
      // Send verification email
      sendEmail({Email, emailType: "VERIFY", userId: savedUser._id});
     }).catch((error: any) => {
      console.error(error);
     });
     
    
    
    return (NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    }));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

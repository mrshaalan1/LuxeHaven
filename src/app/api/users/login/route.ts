import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { Email, Password } = reqBody;
    console.log(reqBody);

    //check if user exists
    const user = await User.findOne({ Email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid Email or Password" },
        { status: 400 }
      );
    }

    console.log("user exists");

    if (!user.isVerfied) {
      return NextResponse.json(
        { error: "Please check your email and confirm your account" },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(Password, user.Password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid Email or Password" },
        { status: 400 }
      );
    }
    console.log(user);

    const tokenData = {
      id: user._id,
      username: user.Username,
      email: user.Email,
    };
    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      isLoggedIn: true,
      token: token,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    //localStorage.setItem("token", token);

    console.log("Set token:", token);

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

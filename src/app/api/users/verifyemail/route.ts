import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";


connect();

const generateToken = () => {
  return Math.random().toString(36).substr(2);
 };
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    console.log(user);

    user.isVerfied = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    if (!user) {
      const newToken = generateToken();
      const newTokenExpiry = Date.now() + 3600000;
  
      user.verifyToken = newToken;
      user.verifyTokenExpiry = newTokenExpiry;
      await user.save();
  
      sendEmail({Email: user.Email, emailType: "VERIFY", userId: user._id});
  
      return NextResponse.json({
        message: "A new verification email has been sent",
        success: true,
      });
    }

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

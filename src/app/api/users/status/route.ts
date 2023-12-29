import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
      const token = request.cookies.get('token');
      if (token) {
        return NextResponse.json({
          message: "User is logged in",
          isLoggedIn: true,
        });
      } else {
        return NextResponse.json({
          message: "User is not logged in",
          isLoggedIn: false,
        });
      }
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
   }
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import connect from "./dbConfig/dbConfig";
import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import jwt from 'jsonwebtoken';


export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath =  path === '/'

  const token = request.cookies.get('token')?.value || ''

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

}
export const config = {
  matcher: [
    '/admin',
    '/myprofile',
    '/myreservations',
    '/Reserve',
  ]
}

const database = async (
  _0: NextApiRequest,
  _1: NextApiResponse,
  next: NextHandler
) => {
  try {
    await connect();
  } catch (error) {
    console.log("Database connection error ", error);
  }
  next();
};

export default database;
 

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

export default withAuth(async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = await req.nextUrl.clone();
  //   const url = req.nextUrl.clone();
  //   console.log("====================================");
  // console.log(pathname, "74108520963852");
  //   console.log("====================================");

  if (!token && pathname !== "/login") {
    const loginUrl = new URL("/login", req.URL);
    return NextResponse.redirect(loginUrl);
  }
  if (token || pathname.includes("/api/auth")) return NextResponse.next();
});

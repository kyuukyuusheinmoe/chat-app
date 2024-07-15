import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const LOGIN_PATH = "/auth/login"
const HOME_PATH = "/"


export default function middleware(request: NextRequest) {
    const token = cookies().get("token")
    switch(request.nextUrl.pathname) {
        case LOGIN_PATH:  if (token ) {
            return NextResponse.redirect(new URL(HOME_PATH, request.url))
        };break;
        default: return NextResponse.redirect(new URL(LOGIN_PATH, request.url))
    }

}

export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico|logo.svg|opengraph-image.jpg).*)',
    ],
  };
  
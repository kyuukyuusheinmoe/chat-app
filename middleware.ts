import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const AUTH_PATH = "/auth"
const LOGIN_PATH = "/auth/login"
const SIGN_UP_PATH = "/auth/signup"
const HOME_PATH = "/"
const GOOGLE_CALLBACK_PATH = "/auth/callback/google"


export default function middleware(request: NextRequest) {
    const token = cookies().get("token")
    switch(request.nextUrl.pathname) {
        case LOGIN_PATH: 
        case AUTH_PATH: 
        case SIGN_UP_PATH:
         if (token ) {
            return NextResponse.redirect(new URL(HOME_PATH, request.url))
        };break;
        case GOOGLE_CALLBACK_PATH: return;
        
        default: if (request.nextUrl.pathname !== AUTH_PATH && !token) return NextResponse.redirect(new URL(AUTH_PATH, request.url))
    }
}

export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|.*\\..*|next).*)',
    ],
  };
  
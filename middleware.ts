import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 404가 발생하는 경로들을 메인 페이지로 리다이렉트
  if (["/rai", "/login", "/model", "/experience", "/agent"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/rai", "/login", "/model", "/experience", "/agent"],
};

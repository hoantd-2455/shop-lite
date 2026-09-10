import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Next.js 16 gọi file này là proxy.ts (tên cũ là middleware.ts).
// Cookie này chỉ là dữ liệu giả cho bài học, không phải cơ chế auth production.
export function proxy(request: NextRequest) {
  const isDemoAuthenticated =
    request.cookies.get("shoplite-demo-auth")?.value === "true";

  if (isDemoAuthenticated) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/orders/:path*", "/checkout/:path*"],
};

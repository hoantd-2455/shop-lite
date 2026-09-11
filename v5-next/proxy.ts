import { auth } from "@/auth";

// Auth.js đọc session JWT và callback `authorized` quyết định cho phép hay redirect.
export const proxy = auth;

export const config = {
  matcher: ["/orders/:path*", "/checkout/:path*"],
};

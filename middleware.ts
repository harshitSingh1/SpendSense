export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/dashboard/:path*", "/tracker/:path*", "/goals/:path*", "/invest/:path*", "/shield/:path*"],
};

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

const publicRoutes = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. i18n first
  const intlResponse = intlMiddleware(req);

  // 2. allow public routes
  const isPublic = publicRoutes.some((route) =>
    pathname.includes(route)
  );

  if (isPublic) return intlResponse;

  // 3. AUTH CHECK (correct way)
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(
      new URL("/en/login", req.url)
    );
  }

  return intlResponse;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   pages: {
//     signIn: "/en/login",
//   },
// });

// export const config = {
//   matcher: ["/(en|es)/dashboard/:path*"],
// };

// callbacks: {
//   authorized: ({ token }) => {
//     return !!token;
//   },
// }
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

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
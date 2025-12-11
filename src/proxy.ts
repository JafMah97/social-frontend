// proxy.ts
import { NextRequest } from "next/server";
import { langMiddleware } from "./utils/middlewars/lang-middleware";

export function proxy(request: NextRequest) {
  return langMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|robots\\.txt|sitemap\\.xml|manifest\\.json|sw\\.js|workbox-.*\\.js).*)",
  ],
};

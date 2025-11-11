import { NextRequest, NextResponse } from "next/server";
import { langMiddleware } from "./utils/middlewars/lang-middleware";

export async function proxy(request: NextRequest) {
  const langResult = await langMiddleware(request);
  if (langResult) return langResult;

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|robots\\.txt|sitemap\\.xml|manifest\\.json|sw\\.js|workbox-.*\\.js).*)",
  ],
};

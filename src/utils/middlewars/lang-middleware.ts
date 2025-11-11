import { NextRequest, NextResponse } from "next/server";

export async function langMiddleware(request: NextRequest) {
  const url = request.nextUrl;
  const langCookie = request.cookies.get("lang")?.value;
  const langParam = url.searchParams.get("lang");

  // If ?lang=... param exists → set cookie
  if (langParam) {
    const res = NextResponse.next();
    res.cookies.set("lang", langParam, { path: "/" });
    return res;
  }

  // If cookie already exists → continue
  if (langCookie) {
    return NextResponse.next();
  }

  // Detect browser language
  const acceptLang = request.headers.get("accept-language") || "";
  const browserLang = acceptLang.split(",")[0].split("-")[0]; // "en" or "ar"

  let redirectLang = "en"; // default
  if (browserLang === "ar") redirectLang = "ar";
  else if (browserLang === "en") redirectLang = "en";

  // Redirect permanently (301)
  url.pathname = `/${redirectLang}`;
  const res = NextResponse.redirect(url, 301);
  res.cookies.set("lang", redirectLang, { path: "/" });
  return res;
}

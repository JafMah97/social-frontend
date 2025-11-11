const isProduction = process.env.NODE_ENV === "production";

export function setCookie(name: string, value: string, permanent = true) {
  if (typeof document === "undefined") {
    // Server-side: cookies should be set via response headers
    console.warn(
      "setCookie called on server side. Use response headers to set cookies."
    );
    return;
  }

  const maxAge = permanent ? 60 * 60 * 24 * 365 : 60 * 60 * 24 * 1; // 1 year or 1 day
  const options = [
    `path=/`,
    `SameSite=Lax`,
    isProduction ? `Secure` : null,
    `Max-Age=${maxAge}`,
  ]
    .filter(Boolean)
    .join("; ");

  document.cookie = `${name}=${encodeURIComponent(value)}; ${options}`;
}

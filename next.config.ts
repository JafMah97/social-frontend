import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// A conservative Content Security Policy. Adjust endpoints (connect-src, img-src,
// font-src, script-src) to match any external services you actually use (CDNs,
// analytics, APIs). Keep it as restrictive as possible and add only the domains
// you trust.
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;
  style-src 'self' 'unsafe-inline' https:;
  img-src 'self' data: blob: https:;
  font-src 'self' https: data:;
  connect-src 'self' https: wss:;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
`;

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    // Remove newlines since header values must be a single line
    value: ContentSecurityPolicy.replace(/\n/g, " ").trim(),
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    // Explicitly disable powerful features by default. Adjust if you need them.
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

// HSTS should only be enabled in production behind HTTPS. We add it conditionally.
if (!isDev) {
  securityHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  });
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Image optimizations: prefer AVIF/WebP and set sensible defaults.
  images: {
    formats: ["image/avif", "image/webp"],
    // Add remotePatterns entries if you load images from external hosts.
    remotePatterns: [],
  },

  // Apply security headers globally. You can scope the `source` to specific
  // paths if needed (for example static files or APIs).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  // Keep future flags explicit; Next 16 is used in this project.
  // Avoid enabling unstable flags unless required by your codebase.
};

export default nextConfig;

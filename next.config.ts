import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Stop other sites from showing this site inside a frame
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
          // Send only the domain, never the full page address, when visitors click an outside link
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // The site never needs these, so don't let anything on it ask for them
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Only one book so far, so send /books straight to it on Amazon
      { source: '/books', destination: 'https://www.amazon.com/dp/B0H4D33D4S', permanent: false },
      { source: '/creators', destination: '/creators/shirley', permanent: false },
    ];
  },
};

export default nextConfig;

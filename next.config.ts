import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
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

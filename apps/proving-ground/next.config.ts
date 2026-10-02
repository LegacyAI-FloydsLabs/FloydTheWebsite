import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: "/admin/:path*", destination: "https://floydslabs.com/admin/:path*", permanent: false },
      { source: "/signin-with-chatgpt", destination: "https://floydslabs.com/admin/login", permanent: false },
      { source: "/signout-with-chatgpt", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;

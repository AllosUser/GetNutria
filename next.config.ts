import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/presentation",
        destination: "/presentation.html",
      },
      {
        source: "/demo",
        destination: "/demo.html",
      },
    ];
  },
};

export default nextConfig;

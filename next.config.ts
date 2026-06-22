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
      {
        source: "/presentationGr",
        destination: "/presentationGr.html",
      },
      {
        source: "/presentgr",
        destination: "/presentgr.html",
      },
    ];
  },
};

export default nextConfig;

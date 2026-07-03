import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: "/uploads/**" },
      { pathname: "/logo.jpg" },
    ],
  },
};

export default nextConfig;

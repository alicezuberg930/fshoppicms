import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // distDir: 'out',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  env: {
    API_URL: process.env.API_URL,
  }
  /* config options here */
};

export default nextConfig;

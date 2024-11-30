import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fshoppii.com',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
  env: {
    API_URL: process.env.API_URL,
  }
  /* config options here */
};

export default nextConfig;

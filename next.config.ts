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
  /* config options here */
};

export default nextConfig;

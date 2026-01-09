import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Optimize images for Netlify
  images: {
    unoptimized: true, // Netlify handles image optimization
    // Allow images from GitHub Raw
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/berbersoft02/wallpaper-hub/**',
      },
    ],
  },
};

export default nextConfig;

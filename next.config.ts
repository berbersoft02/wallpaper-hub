import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Optimize images for Netlify
  images: {
    unoptimized: true, // Netlify handles image optimization
  },
};

export default nextConfig;

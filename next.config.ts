import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Disable image optimization to reduce function size
  // Images will be served statically from public/ folder
  images: {
    unoptimized: true, // Images served statically, not processed by Next.js
  },
  // Increase the maximum upload size for API routes
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
};

export default nextConfig;

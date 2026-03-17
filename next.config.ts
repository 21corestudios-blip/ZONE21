import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // On autorise Next.js à charger et optimiser les images externes de nos placeholders
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
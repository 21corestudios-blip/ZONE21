import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // On déclare explicitement les niveaux de qualité autorisés
    qualities: [25, 50, 75, 100], 
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
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "", // Leave empty for default ports
        pathname: "/v0/b/**", // Use `**` for wildcard matching
      },
    ],
  },
};

export default nextConfig;

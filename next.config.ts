import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOST || "localhost",
        pathname: "/storage/v1/object/sign/portfolio-maker/**", // bucket name
      },
    ],
  },
};

export default nextConfig;

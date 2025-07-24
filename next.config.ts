import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kulraeahqplmequlfsjo.supabase.co",
        pathname: "/storage/v1/object/sign/portfolio-maker/**", // bucket name
      },
    ],
  },
};

export default nextConfig;

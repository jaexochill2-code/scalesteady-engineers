import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/marketfit-painmanagment",
        destination: "/marketfit-painmanagement",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

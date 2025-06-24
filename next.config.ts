import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
        locale: false,
      },
    ];
  },
};

export default nextConfig;

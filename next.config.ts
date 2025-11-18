import type { NextConfig } from "next";

const nextConfig: NextConfig = {
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
};
};

export default nextConfig;

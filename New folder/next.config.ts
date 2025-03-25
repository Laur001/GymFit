import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        port: '', // Optional, leave empty
        pathname: '/**', // Allows all paths under this domain
      },
    ],
  },
};

export default nextConfig;
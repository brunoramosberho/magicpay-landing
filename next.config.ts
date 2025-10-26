import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/lrigu76hy/tailark/**',
      },
      {
        protocol: 'https',
        hostname: 'html.tailus.io',
        port: '',
        pathname: '/blocks/customers/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/p/:uuid',
        destination: 'https://main.d2hklxelx6kl7w.amplifyapp.com/?id=:uuid',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

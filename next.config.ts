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
        destination: 'https://finsus.mgic.me/?id=:uuid',
        permanent: false,
      },
      {
        source: '/d/:uuid',
        destination: 'https://magicdemo.b4a.app/p/:uuid',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

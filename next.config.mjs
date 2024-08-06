/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
      },
      {
        protocol: 'https',
        hostname: 'fineur.pk',
      },
      {
        protocol: 'https',
        hostname: 'rtwcreation.com',
      },
      {
        protocol: 'https',
        hostname: 'api.anluxuries.com',
      },
    ],
  },
};

export default nextConfig;

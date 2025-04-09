/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1', // untuk lokal Laravel
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com', // <--- tambahan domain eksternal
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;

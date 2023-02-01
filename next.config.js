/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'storage.googleapis.com',
      'i.imgur.com',
      'arthurpetry.com',
      'www.arthurpetry.com',
    ],
  },
};

module.exports = nextConfig;

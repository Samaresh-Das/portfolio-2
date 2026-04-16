/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["drive.google.com"],
    unoptimized: true,
  },
  transpilePackages: ["three"],
};

module.exports = nextConfig;

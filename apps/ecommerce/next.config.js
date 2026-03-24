/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui', '@repo/config', '@repo/lib', '@repo/forms', '@repo/analytics'],
};

module.exports = nextConfig;

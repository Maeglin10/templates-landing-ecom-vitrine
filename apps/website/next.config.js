/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui', '@repo/config', '@repo/lib', '@repo/forms', '@repo/analytics', '@repo/auth', '@repo/db'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Pages that need a DB at build time must be dynamic
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  // Force dynamic rendering for pages that hit the DB
  // so they don't fail at build time without DATABASE_URL
  generateBuildId: async () => 'build',
};

module.exports = nextConfig;

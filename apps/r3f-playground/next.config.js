const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: isProd ? process.env.NEXT_PUBLIC_BASE_PATH : '',
  basePath: isProd ? process.env.NEXT_PUBLIC_BASE_PATH : '',
};

module.exports = nextConfig;

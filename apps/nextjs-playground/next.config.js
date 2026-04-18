const isProd = process.env.NODE_ENV === 'production';

const PATH_PREFIX = '/showroom/nextjs-playground';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: isProd ? PATH_PREFIX : '',
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

module.exports = nextConfig;

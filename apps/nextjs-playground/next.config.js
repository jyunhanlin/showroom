const isProd = process.env.NODE_ENV === 'production';

const PATH_PREFIX = '/nextjs-playground';

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: isProd ? PATH_PREFIX : '',
  basePath: isProd ? PATH_PREFIX : '',
  output: 'export',
};

module.exports = nextConfig;

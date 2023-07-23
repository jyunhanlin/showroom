const isProd = process.env.NODE_ENV === 'production';

const PATH_PREFIX = '/showroom/nextjs-playground';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // assetPrefix: 'http://localhost:5500/', //isProd ? PATH_PREFIX : '',
  basePath: isProd ? PATH_PREFIX : '',
  output: 'export',
};

module.exports = nextConfig;

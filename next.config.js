const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  assetPrefix: isProd ? process.env.NEXT_PUBLIC_BASE_PATH : '',
  basePath: isProd ? process.env.NEXT_PUBLIC_BASE_PATH : '',
};

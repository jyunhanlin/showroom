const isProd = process.env.NODE_ENV === 'production';
const PATH_PREFIX = '/showroom/nextjs-playground';
export const assetPath = isProd ? PATH_PREFIX : '';

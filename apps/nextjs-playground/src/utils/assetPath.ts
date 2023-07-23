const isProd = process.env.NODE_ENV === 'production';
export const assetPath = isProd ? process.env.NEXT_PUBLIC_BASE_PATH : '';

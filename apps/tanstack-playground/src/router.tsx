import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const basepath = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export function getRouter() {
  return createRouter({
    routeTree,
    basepath,
    defaultPreload: 'intent',
    scrollRestoration: true,
  });
}

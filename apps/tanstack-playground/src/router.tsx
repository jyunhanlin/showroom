import { createHashHistory, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const basepath = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export function getRouter() {
  return createRouter({
    routeTree,
    basepath,
    history: typeof document === 'undefined' ? undefined : createHashHistory(),
    defaultPreload: 'intent',
    scrollRestoration: true,
  });
}

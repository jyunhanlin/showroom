import { createHashHistory, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const isClient = typeof document !== 'undefined';
const ssrBasepath = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export function getRouter() {
  return createRouter({
    routeTree,
    basepath: isClient ? '/' : ssrBasepath,
    history: isClient ? createHashHistory() : undefined,
    defaultPreload: 'intent',
    scrollRestoration: true,
  });
}

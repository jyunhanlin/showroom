'use client';

import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { DarkModeSwitch } from '@/components/layout/DarkModeSwitch';
import { Main } from '@/components/layout/Main';

const linkCls = 'text-blue-600 hover:underline dark:text-blue-400';

const Index = () => (
  <Container className="h-full">
    <Main className="block h-full px-4 py-12 sm:flex sm:p-4">
      <div className="mb-8 h-auto w-full overflow-auto sm:h-full sm:w-1/2">
        <h3 className="text-lg font-semibold">React Three Fiber playground</h3>
        <ul className="list-disc space-y-1 pt-4 pl-5">
          <li>
            <Link className={linkCls} href="/particles">
              Particles
            </Link>
          </li>
          <li>
            <Link className={linkCls} href="/ripple-blend">
              Ripple Blend
            </Link>
          </li>
          <li>
            <Link className={linkCls} href="/scroll-effect">
              Scroll Effect
            </Link>
          </li>
          <li>
            <Link className={linkCls} href="/scroll-effect-horizontal">
              Scroll Effect Horizontal
            </Link>
          </li>
          <li>
            <Link className={linkCls} href="/littlest-tokyo">
              Littlest Tokyo
            </Link>{' '}
            (
            <a
              className={linkCls}
              href="https://twitter.com/0xca0a/status/1459521570934771713"
              target="_blank"
              rel="noopener noreferrer"
            >
              copy from here
            </a>
            )
          </li>
          <li>
            <Link className={linkCls} href="/watch">
              Watch
            </Link>{' '}
            (
            <a
              className={linkCls}
              href="https://twitter.com/0xca0a/status/1464545129893617666"
              target="_blank"
              rel="noopener noreferrer"
            >
              copy from here
            </a>
            )
          </li>
        </ul>
      </div>
      <div className="h-auto w-full overflow-auto sm:h-full sm:w-1/2">
        <h3 className="text-lg font-semibold">Three.js playground</h3>
        <ul className="list-disc space-y-1 pt-4 pl-5">
          <li>
            <Link className={linkCls} href="/merge-with-html">
              Merge with HTML
            </Link>
          </li>
        </ul>
      </div>
    </Main>
    <DarkModeSwitch />
  </Container>
);

export default Index;

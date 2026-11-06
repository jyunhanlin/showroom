'use client';

import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { DarkModeSwitch } from '@/components/layout/DarkModeSwitch';

import { DrawableCardDemo } from './DrawableCardDemo';
import { RequestPaintLoopDemo } from './RequestPaintLoopDemo';
import { useHtmlInCanvasSupport, type Support } from './support';
import { WebGPUPlaneDemo } from './WebGPUPlaneDemo';

export function HtmlInCanvasPage() {
  const support = useHtmlInCanvasSupport();

  return (
    <Container className="min-h-full">
      <main className="mx-auto max-w-3xl space-y-12 px-4 py-12">
        <header className="space-y-3">
          <Link href="/" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
            ← Showroom
          </Link>
          <h1 className="text-2xl font-bold">HTML-in-Canvas</h1>
          <p className="text-sm leading-relaxed">
            把活的 DOM 子樹畫進 <code>&lt;canvas&gt;</code>，畫進去之後還能點、還在無障礙樹裡。Chrome 157 起內建。
            這頁每一段都用同一張 card 證明一件事。
          </p>
          <SupportBanner support={support} />
        </header>

        <Section
          title="1. 畫進去，然後聽 paint 事件"
          body={
            <>
              <code>&lt;canvas content=&quot;drawable&quot;&gt;</code> 讓子元素參與排版；子元素加 <code>drawable</code>{' '}
              就是獨立的 paint root。card 裡的按鈕也標了 <code>drawable</code>，所以它被排除在 card 的子樹之外，
              由另一個 <code>drawElementImage</code> 畫到右邊並旋轉。 點它、或切換顏色，DOM 一變瀏覽器就送{' '}
              <code>paint</code>，<code>changedElements</code> 只列出真的變了的 drawable。canvas 格線對齊裝置像素， 所以
              Retina 上文字不糊。
            </>
          }
        >
          <DrawableCardDemo support={support} />
        </Section>

        <Section
          title="2. requestPaint() 當動畫迴圈"
          body={
            <>
              沒有 DOM 變化也想重畫，就在 handler 結尾呼叫 <code>requestPaint()</code>，下一個 frame 再送一次{' '}
              <code>paint</code>。每次 <code>drawElementImage</code> 都重設幾何，所以按鈕移到哪裡點擊就跟到哪裡。 暫停後
              paint/s 歸零；此時點按鈕仍會觸發一次 paint，因為 count 在 DOM 裡。
            </>
          }
        >
          <RequestPaintLoopDemo support={support} />
        </Section>

        <Section
          title="3. WebGPU：貼到傾斜的平面上"
          body={
            <>
              2D 以外瀏覽器算不出元素在哪，所以每個 frame 把 screen × projection × view × model 乘成一顆帶透視的{' '}
              <code>DOMMatrix</code> 交給 <code>updateElementGeometry()</code>。 貼圖本身在 <code>paint</code> 事件裡用{' '}
              <code>drawElementImageToTexture</code> 寫進 <code>GPUTexture</code>，再包成 three 的{' '}
              <code>ExternalTexture</code>。three.js 內建的 <code>HTMLTexture</code> 還在用 Chrome 157 之前的 API
              名稱，所以這段自己橋。
            </>
          }
        >
          <WebGPUPlaneDemo support={support} />
        </Section>

        <footer className="text-xs text-slate-500">
          參考：
          <a
            className="ml-1 text-blue-600 hover:underline dark:text-blue-400"
            href="https://developer.chrome.com/docs/web-platform/html-in-canvas"
            target="_blank"
            rel="noopener noreferrer"
          >
            developer.chrome.com / html-in-canvas
          </a>
        </footer>
      </main>
      <DarkModeSwitch />
    </Container>
  );
}

function SupportBanner({ support }: { support: Support }) {
  if (support === 'unknown') return null;
  const ok = support === 'yes';
  return (
    <p
      data-testid="support-banner"
      className={`rounded-md px-3 py-2 text-sm ${
        ok ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
      }`}
    >
      {ok
        ? '這個瀏覽器支援 HTML-in-Canvas（canvas.content === "drawable"）。'
        : '這個瀏覽器不支援 HTML-in-Canvas，每一段會改顯示 canvas 外的同一組 DOM。'}
    </p>
  );
}

function Section({ title, body, children }: { title: string; body: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm leading-relaxed [&_code]:rounded [&_code]:bg-slate-200 [&_code]:px-1 [&_code]:text-[0.85em] dark:[&_code]:bg-slate-600">
        {body}
      </p>
      {children}
    </section>
  );
}

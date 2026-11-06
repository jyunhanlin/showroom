'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Container } from '@/components/layout/Container';
import { DarkModeSwitch } from '@/components/layout/DarkModeSwitch';

import { DissolveTransitionDemo } from './DissolveTransitionDemo';
import { DrawableCardDemo } from './DrawableCardDemo';
import { RequestPaintLoopDemo } from './RequestPaintLoopDemo';
import { StressDemo } from './StressDemo';
import { useHtmlInCanvasSupport, type Support } from './support';
import { WebGPUPlaneDemo } from './WebGPUPlaneDemo';

export function HtmlInCanvasPage() {
  const support = useHtmlInCanvasSupport();
  // The measuring section stays; the others unmount or pause so their work stays out of its numbers.
  const [activeDemo, setActiveDemo] = useState<'stress' | 'dissolve' | null>(null);

  return (
    <Container className="min-h-full">
      <main className="mx-auto max-w-3xl space-y-12 px-4 py-12">
        <header className="space-y-3">
          <Link href="/" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
            ← Showroom
          </Link>
          <h1 className="text-2xl font-bold">HTML-in-Canvas</h1>
          <p className="text-sm leading-relaxed">
            把活的 DOM 子樹畫進 <code>&lt;canvas&gt;</code>，畫進去之後還能點、還在無障礙樹裡。Chrome 157 起內建。 第 1
            段示範 2D 繪製、paint 事件和格線對齊，第 2 段示範 requestPaint 動畫，第 3 段示範 WebGPU 平面上的
            hit-test，第 4 段是大量 drawable 的壓測，第 5 段是全尺寸 drawable 的溶解轉場和 texture 成本。
          </p>
          <SupportBanner support={support} />
        </header>

        {activeDemo === null && (
          <>
            <Section
              title="1. 畫進去，然後聽 paint 事件"
              body={
                <>
                  <code>&lt;canvas content=&quot;drawable&quot;&gt;</code> 讓子元素參與排版；子元素加{' '}
                  <code>drawable</code> 就是獨立的 paint root。card 裡的按鈕也標了 <code>drawable</code>，所以它被排除在
                  card 的子樹之外， 由另一個 <code>drawElementImage</code> 畫到右邊並旋轉。 點它、或切換顏色，DOM
                  一變瀏覽器就送 <code>paint</code>，<code>changedElements</code> 只列出真的變了的 drawable。canvas
                  格線對齊裝置像素， 所以 Retina 上文字不糊。
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
                  <code>paint</code>。每次 <code>drawElementImage</code> 都重設幾何，所以按鈕移到哪裡點擊就跟到哪裡。
                  暫停後 paint/s 歸零；此時點按鈕仍會觸發一次 paint，因為 count 在 DOM 裡。
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
                  <code>DOMMatrix</code> 交給 <code>updateElementGeometry()</code>。 貼圖本身在 <code>paint</code>{' '}
                  事件裡用 <code>drawElementImageToTexture</code> 寫進 <code>GPUTexture</code>，再包成 three 的{' '}
                  <code>ExternalTexture</code>。three.js 內建的 <code>HTMLTexture</code> 還在用 Chrome 157 之前的 API
                  名稱，所以這段自己橋。
                </>
              }
            >
              <WebGPUPlaneDemo support={support} />
            </Section>
          </>
        )}

        <div hidden={activeDemo === 'dissolve'}>
          <Section
            title="4. 壓測：座位圖情境"
            body={
              <>
                比較三種畫 10×10 無文字座位的方式：每個座位一個 <code>drawable</code>、純 Canvas 2D，以及 WebGL2
                instancing。每次繪製都重畫所有座位，程式不做裁切，但畫面外的座位會被 canvas 截掉，所以 1
                萬個以上的像素工作量大致相同。 平移每個 frame 改位置；模擬 hover 每個 frame 做一次 hit test
                並改一個座位的顏色。 幀時間取自 requestAnimationFrame
                的間隔，最低就是螢幕更新間隔，低於上限時看不出還有多少餘裕，所以對照方式另外有 20 萬和 100 萬個。繪製 JS
                時間不能跨方式比較：drawable 不含瀏覽器的樣式和排版，另外兩種不含點陣化和 GPU。真實 hover
                延遲量到繪製後的下一個 frame，同樣看不到 GPU 時間。按下去才開始，5
                萬個可能要跑一分鐘，執行時其他段會卸載，避免它們的動畫混進數字。結果只代表這台機器和這個瀏覽器。
              </>
            }
          >
            <StressDemo support={support} onActiveChange={(active) => setActiveDemo(active ? 'stress' : null)} />
          </Section>
        </div>

        <Section
          title="5. 溶解轉場：全螢幕 texture 的成本"
          body={
            <>
              兩頁都是全尺寸的 <code>drawable</code>，各自寫進一張 <code>GPUTexture</code>。前面那頁用{' '}
              <code>alphaMap</code> 的雜訊加上遞增的 <code>alphaTest</code> 丟棄像素，露出後面那頁，不需要自訂
              shader。量測比較區塊與全螢幕，以及只擷取一次與每 frame 重新擷取；重新擷取時每 frame
              也改一小段文字，所以多了一點點陣化成本。每次擷取 JS 時間只含送出指令，不含 GPU 執行。佇列等待是從該 frame
              最後一次送出到 <code>onSubmittedWorkDone</code> 的時間，已經做完的工作不算，所以是 GPU 時間的下限，不是
              GPU 時間本身。幀時間最低就是螢幕更新間隔，低於上限時看不出還有多少餘裕。全螢幕指填滿視窗的
              canvas，尺寸取決於視窗和
              DPR，頁面內容也會影響成本。執行時其他段會卸載或隱藏。結果只代表這台機器和這個瀏覽器。
            </>
          }
        >
          <DissolveTransitionDemo
            support={support}
            paused={activeDemo === 'stress'}
            onActiveChange={(active) => setActiveDemo(active ? 'dissolve' : null)}
          />
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
        : '這個瀏覽器不支援 HTML-in-Canvas，第 1 到 3 段和第 5 段會改顯示 canvas 外的同一組 DOM，第 4 段只能跑不需要它的方式。'}
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

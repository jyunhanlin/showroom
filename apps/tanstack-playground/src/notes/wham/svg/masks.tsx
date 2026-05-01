import { useState } from 'react';

const MOON_COLOR = 'oklch(0.78 0.18 30)';
const ALT_COLOR = 'oklch(0.78 0.16 280)';

export function CrescentMoonMask() {
  const [offset, setOffset] = useState(20);
  const [opacity, setOpacity] = useState(100);

  const grey = `hsl(0 0% ${100 - opacity}%)`;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-md bg-slate-900 p-4">
        <svg viewBox="0 0 80 80" width={200} height={200}>
          <defs>
            <mask id="wham-mask-moon">
              <rect x="0" y="0" width="80" height="80" fill="white" />
              <circle cx={40 + offset} cy={40 - offset} r="30" fill={grey} />
            </mask>
          </defs>
          <circle cx="40" cy="40" r="30" fill={MOON_COLOR} mask="url(#wham-mask-moon)" />
        </svg>
      </div>
      <div className="grid w-full max-w-md grid-cols-1 gap-2 font-mono text-sm">
        <label className="flex items-center gap-3">
          <span className="w-32">cutout 偏移: {offset}px</span>
          <input type="range" min={-30} max={30} value={offset} onChange={(e) => setOffset(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-3">
          <span className="w-32">cutout 不透明度: {opacity}%</span>
          <input type="range" min={0} max={100} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} />
        </label>
      </div>
      <p className="text-xs text-gray-500">
        遮罩裡:白色 = 顯示、黑色 = 切掉、灰色 = 半透明。拖偏移看月亮從滿月變新月。
      </p>
    </div>
  );
}

export function MaskVsClipPath() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Variant title="<mask> + stroke" desc="可以用 stroke (描邊),paint 之後當遮罩">
          <svg viewBox="0 0 80 80" width={180} height={180}>
            <defs>
              <mask id="wham-mask-stroke">
                <path d="M 8,40 C 24,72 40,8 56,40 S 72,72 72,40" fill="none" stroke="white" strokeWidth="6" />
              </mask>
            </defs>
            <rect x="0" y="0" width="80" height="80" fill={ALT_COLOR} mask="url(#wham-mask-stroke)" />
          </svg>
        </Variant>
        <Variant title="<clipPath> + stroke" desc="clipPath 永遠只看 fill,stroke 被 ignore">
          <svg viewBox="0 0 80 80" width={180} height={180}>
            <defs>
              <clipPath id="wham-clip-stroke">
                <path d="M 8,40 C 24,72 40,8 56,40 S 72,72 72,40" fill="none" stroke="white" strokeWidth="6" />
              </clipPath>
            </defs>
            <rect x="0" y="0" width="80" height="80" fill={ALT_COLOR} clipPath="url(#wham-clip-stroke)" />
          </svg>
        </Variant>
      </div>
      <p className="text-xs text-gray-500">同一條曲線當 mask vs clipPath:左邊看到曲線描邊,右邊整片消失。</p>
    </div>
  );
}

function Variant({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="font-mono text-xs text-gray-700">{title}</p>
      <p className="text-xs text-gray-500">{desc}</p>
      <div className="rounded-md bg-slate-900 p-3">{children}</div>
    </div>
  );
}

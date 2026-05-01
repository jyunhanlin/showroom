import { range } from 'lodash-es';
import { useState } from 'react';

const VIEWBOX_SIZE = 64;
const CENTER = VIEWBOX_SIZE / 2;

export function ConcentricCirclesGenerator() {
  const [rangeStep, setRangeStep] = useState(3);
  const [minDashes, setMinDashes] = useState(3);
  const [dashGrowthRate, setDashGrowthRate] = useState(1);
  const [hueShift, setHueShift] = useState(8);
  const [strokeWidth, setStrokeWidth] = useState(1);

  const radii = range(rangeStep, VIEWBOX_SIZE / 2, rangeStep);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-md bg-slate-900 p-3">
        <svg viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`} width={260} height={260} style={{ strokeWidth }}>
          {radii.map((radius, index) => {
            const circumference = 2 * Math.PI * radius;
            const numOfDashes = Math.round(index * dashGrowthRate + minDashes);
            const dashSize = circumference / (numOfDashes * 2);
            const hue = 240 + hueShift * index;
            return (
              <circle
                key={radius}
                cx={CENTER}
                cy={CENTER}
                r={radius}
                fill="none"
                stroke={`hsl(${hue}deg 80% 70%)`}
                strokeDasharray={`${dashSize.toFixed(2)} ${dashSize.toFixed(2)}`}
              />
            );
          })}
        </svg>
      </div>
      <div className="grid w-full max-w-md grid-cols-1 gap-1 font-mono text-sm sm:grid-cols-2">
        <label className="flex items-center gap-2">
          <span className="w-32">step: {rangeStep}</span>
          <input
            type="range"
            min={2}
            max={8}
            value={rangeStep}
            onChange={(e) => setRangeStep(Number(e.target.value))}
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-32">minDashes: {minDashes}</span>
          <input
            type="range"
            min={1}
            max={10}
            value={minDashes}
            onChange={(e) => setMinDashes(Number(e.target.value))}
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-32">growthRate: {dashGrowthRate}</span>
          <input
            type="range"
            min={0}
            max={3}
            step={0.1}
            value={dashGrowthRate}
            onChange={(e) => setDashGrowthRate(Number(e.target.value))}
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-32">hueShift: {hueShift}°</span>
          <input
            type="range"
            min={-30}
            max={30}
            value={hueShift}
            onChange={(e) => setHueShift(Number(e.target.value))}
          />
        </label>
        <label className="flex items-center gap-2 sm:col-span-2">
          <span className="w-32">strokeWidth: {strokeWidth}</span>
          <input
            type="range"
            min={0.2}
            max={3}
            step={0.1}
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
          />
        </label>
      </div>
      <p className="text-xs text-gray-500">
        每圈 dashSize 跟自身周長綁定 — 想拼成完整環,要算 `circumference / (numOfDashes * 2)`。
      </p>
    </div>
  );
}

'use client';

import type { Ref } from 'react';

type Props = {
  cardRef?: Ref<HTMLDivElement>;
  buttonRef?: Ref<HTMLButtonElement>;
  count: number;
  onClick: () => void;
  accent: boolean;
  /** When true the button is its own drawable and is excluded from the card's subtree. */
  nestedDrawable: boolean;
  label?: string;
  /** Several cards live on the page; ids must stay unique for the paint-event log. */
  idPrefix: string;
};

export const CARD_WIDTH = 240;
export const CARD_HEIGHT = 150;

/**
 * The DOM that gets painted into a canvas. A fixed border-box, because drawElementImage
 * draws the border box.
 */
export function DemoCard({
  cardRef,
  buttonRef,
  count,
  onClick,
  accent,
  nestedDrawable,
  label = 'Card',
  idPrefix,
}: Props) {
  return (
    <div
      ref={cardRef}
      drawable=""
      id={`${idPrefix}-card`}
      className={`box-border flex flex-col justify-between rounded-xl border p-4 text-left shadow-sm transition-colors ${
        accent ? 'border-amber-400 bg-amber-50 text-amber-950' : 'border-slate-300 bg-white text-slate-900'
      }`}
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
    >
      <div>
        <h2 className="text-base font-bold">{label}</h2>
        <p className="mt-1 text-sm leading-snug">
          這是真的 DOM。點了 <strong>{count}</strong> 次。
        </p>
      </div>
      <button
        ref={buttonRef}
        type="button"
        id={`${idPrefix}-button`}
        drawable={nestedDrawable ? '' : undefined}
        onClick={onClick}
        className="box-border w-fit cursor-pointer rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-500 active:bg-blue-700"
      >
        點我 +1
      </button>
    </div>
  );
}

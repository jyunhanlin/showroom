import type { ReactNode } from 'react';

type Props = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function DemoFrame({ title, children, className }: Props) {
  return (
    <figure className={`not-prose my-6 overflow-hidden rounded-lg border border-gray-200 ${className ?? ''}`.trim()}>
      {title && (
        <figcaption className="border-b border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600">{title}</figcaption>
      )}
      <div className="bg-white p-4">{children}</div>
    </figure>
  );
}

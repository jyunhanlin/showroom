import { Metadata } from 'next';

import { HtmlInCanvasPage } from '@/components/html-in-canvas/HtmlInCanvasPage';

export const metadata: Metadata = {
  title: 'HTML in Canvas',
};

export default function Page() {
  return <HtmlInCanvasPage />;
}

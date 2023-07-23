import { Metadata } from 'next';

import Home from './home';

export const metadata: Metadata = {
  title: 'Showroom | Hank Lin',
};

export default function HomePage() {
  return <Home />;
}

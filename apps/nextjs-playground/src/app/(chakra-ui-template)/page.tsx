import { Metadata } from 'next';

import Home from './home';

export const metadata: Metadata = {
  title: 'Showroom',
};

export default function HomePage() {
  return <Home />;
}

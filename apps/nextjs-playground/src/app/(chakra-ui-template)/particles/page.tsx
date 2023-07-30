import { Metadata } from 'next';

import { Container } from '@/components/layout/Container';
import { Particles } from '@/components/r3f/Particles';

export const metadata: Metadata = {
  title: 'Particles',
};

export default function HomePage() {
  return (
    <Container height="100%">
      <Particles />
    </Container>
  );
}

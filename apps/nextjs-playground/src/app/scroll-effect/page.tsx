import { Metadata } from 'next';

import { Container } from '@/components/layout/Container';
import { ScrollEffect } from '@/components/r3f/ScrollEffect';

export const metadata: Metadata = {
  title: 'Scroll Effect',
};

const ScrollEffectPage = () => {
  return (
    <Container className="h-full">
      <ScrollEffect />
    </Container>
  );
};

export default ScrollEffectPage;

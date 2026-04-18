import { Metadata } from 'next';

import { Container } from '@/components/layout/Container';
import { ScrollEffectHorizontal } from '@/components/r3f/ScrollEffectHorizontal';

export const metadata: Metadata = {
  title: 'Scroll Effect Horizontal',
};

const ScrollEffectHorizontalPage = () => {
  return (
    <Container className="h-full">
      <ScrollEffectHorizontal />
    </Container>
  );
};

export default ScrollEffectHorizontalPage;

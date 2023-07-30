import { Metadata } from 'next';

import { Container } from '@/components/layout/Container';
import { ScrollEffectHorizontal } from '@/components/r3f/ScrollEffectHorizontal';

export const metadata: Metadata = {
  title: 'Scroll Effect Horizontal',
};

const ScrollEffectHorizontalPage = () => {
  return (
    <Container height="100%">
      <ScrollEffectHorizontal />
    </Container>
  );
};

export default ScrollEffectHorizontalPage;

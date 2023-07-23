import { Metadata } from 'next';

import { Container } from '@/components/layout/Container';
import { RippleBlend } from '@/components/r3f/RippleBlend';

export const metadata: Metadata = {
  title: 'Ripple Blend',
};

const RippleBlendPage = () => {
  return (
    <Container height="100%">
      <RippleBlend />
    </Container>
  );
};

export default RippleBlendPage;

import { Metadata } from 'next';

import { Container } from '@/components/layout/Container';
import { RippleBlend } from '@/components/r3f/RippleBlend2';

export const metadata: Metadata = {
  title: 'Ripple Blend 2',
};

const RippleBlend2Page = () => {
  return (
    <Container height="100%">
      <RippleBlend />
    </Container>
  );
};

export default RippleBlend2Page;

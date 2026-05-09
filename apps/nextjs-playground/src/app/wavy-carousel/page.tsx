import { Metadata } from 'next';

import { Container } from '@/components/layout/Container';
import { WavyCarousel } from '@/components/r3f/WavyCarousel';

export const metadata: Metadata = {
  title: 'Wavy Carousel',
};

const WavyCarouselPage = () => {
  return (
    <Container className="h-full">
      <WavyCarousel />
    </Container>
  );
};

export default WavyCarouselPage;

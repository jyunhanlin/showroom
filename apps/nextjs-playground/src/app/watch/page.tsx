import { Metadata } from 'next';

import { Container } from '@/components/layout/Container';
import { Watch } from '@/components/r3f/Watch';

export const metadata: Metadata = {
  title: 'Watch',
};

const WatchPage = () => {
  return (
    <Container className="h-full">
      <Watch />
    </Container>
  );
};

export default WatchPage;

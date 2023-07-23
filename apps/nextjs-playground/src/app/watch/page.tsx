import { Metadata } from 'next';

import { Container } from '@/components/layout/Container';
import { Watch } from '@/components/r3f/Watch';

export const metadata: Metadata = {
  title: 'Watch',
};

const WatchPage = () => {
  return (
    <Container height="100%">
      <Watch />
    </Container>
  );
};

export default WatchPage;

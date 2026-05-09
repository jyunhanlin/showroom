import { Metadata } from 'next';

import { Container } from '@/components/layout/Container';
import { LittlestTokyo } from '@/components/r3f/LittlestTokyo';

export const metadata: Metadata = {
  title: 'Littlest Tokyo',
};

const LittlestTokyoPage = () => {
  return (
    <Container className="h-full">
      <LittlestTokyo />
    </Container>
  );
};

export default LittlestTokyoPage;

import { Metadata } from 'next';

import { Container } from '@/components/layout/Container';
import { StandingDesk } from '@/components/r3f/StandingDesk';

export const metadata: Metadata = {
  title: 'Standing Desk',
};

export default function HomePage() {
  return (
    <Container className="h-full">
      <StandingDesk />
    </Container>
  );
}

import { Metadata } from 'next';

import { Container } from '@/components/layout/Container';
import { MergeWithHTML } from '@/components/r3f/MergeWithHTML';

export const metadata: Metadata = {
  title: 'Merge With HTML',
};

const MergeWithHTMLPage = () => {
  return (
    <Container className="h-full">
      <MergeWithHTML />
    </Container>
  );
};

export default MergeWithHTMLPage;

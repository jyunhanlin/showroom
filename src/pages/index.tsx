import { Flex } from '@chakra-ui/react';

import { Container } from '@/components/layout/Container';
import { DarkModeSwitch } from '@/components/layout/DarkModeSwitch';
import { Main } from '@/components/layout/Main';
import { NavOrAside } from '@/components/layout/NavOrAside';

const Index: React.FC = () => (
  <Container height="100%">
    <Flex direction={['column', 'row']} padding="16px" maxWidth="1200px" margin="auto">
      <NavOrAside />
      <Main></Main>
    </Flex>
    <DarkModeSwitch />
  </Container>
);

export default Index;

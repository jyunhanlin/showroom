import { Flex } from '@chakra-ui/react';

import { Container } from '@/components/Container';
import { DarkModeSwitch } from '@/components/DarkModeSwitch';
import { Main } from '@/components/Main';
import { NavOrAside } from '@/components/NavOrAside';

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

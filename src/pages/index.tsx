import { Heading, Link as ChakraLink, UnorderedList, ListItem } from '@chakra-ui/react';
import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { DarkModeSwitch } from '@/components/layout/DarkModeSwitch';
import { Main } from '@/components/layout/Main';

const Index = () => (
  <Container height="100%">
    <Main padding="1rem">
      <Heading as="h3" size="md">
        React Three Fiber playground
      </Heading>
      <UnorderedList spacing="4px" paddingTop="1rem">
        <ListItem>
          <ChakraLink as={Link} href="/particles">
            Particles
          </ChakraLink>
        </ListItem>
        <ListItem>
          <ChakraLink as={Link} href="/ripple-blend">
            Ripple Blend
          </ChakraLink>
          ,{' '}
          <ChakraLink as={Link} href="/ripple-blend2">
            Ripple Blend 2
          </ChakraLink>
        </ListItem>
      </UnorderedList>
    </Main>
    <DarkModeSwitch />
  </Container>
);

export default Index;

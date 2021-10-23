import { Box, Heading, Link as ChakraLink, UnorderedList, ListItem } from '@chakra-ui/react';
import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { DarkModeSwitch } from '@/components/layout/DarkModeSwitch';
import { Main } from '@/components/layout/Main';

const Index = () => (
  <Container height="100%">
    <Main display="flex" padding="1rem" height="100%">
      <Box width="50%" height="100%" overflow="auto">
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
          </ListItem>
          <ListItem>
            <ChakraLink as={Link} href="/scroll-effect">
              Scroll Effect
            </ChakraLink>
          </ListItem>
        </UnorderedList>
      </Box>
      <Box width="50%" height="100%" overflow="auto">
        <Heading as="h3" size="md">
          Three.js playground
        </Heading>
        <UnorderedList spacing="4px" paddingTop="1rem">
          <ListItem>
            <ChakraLink as={Link} href="/merge-with-html">
              Merge with HTML
            </ChakraLink>
          </ListItem>
        </UnorderedList>
      </Box>
    </Main>
    <DarkModeSwitch />
  </Container>
);

export default Index;

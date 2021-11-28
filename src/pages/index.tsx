import { Box, Heading, Link as ChakraLink, UnorderedList, ListItem } from '@chakra-ui/react';
import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { DarkModeSwitch } from '@/components/layout/DarkModeSwitch';
import { Main } from '@/components/layout/Main';

const Index = () => (
  <Container height="100%">
    <Main display={['box', 'flex']} padding={['3rem 1rem', '1rem']} height="100%">
      <Box width={['100%', '50%']} height={['auto', '100%']} overflow="auto" marginBottom="2rem">
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
          <ListItem>
            <ChakraLink as={Link} href="/scroll-effect-horizontal">
              Scroll Effect Horizontal
            </ChakraLink>
          </ListItem>
          <ListItem>
            <ChakraLink as={Link} href="/littlest-tokyo">
              Littlest Tokyo
            </ChakraLink>{' '}
            (
            <ChakraLink
              href="https://twitter.com/0xca0a/status/1459521570934771713"
              target="_blank"
              rel="noopener noreferrer"
            >
              copy from here
            </ChakraLink>
            )
          </ListItem>
          <ListItem>
            <ChakraLink as={Link} href="/watch">
              Watch
            </ChakraLink>{' '}
            (
            <ChakraLink
              href="https://twitter.com/0xca0a/status/1464545129893617666"
              target="_blank"
              rel="noopener noreferrer"
            >
              copy from here
            </ChakraLink>
            )
          </ListItem>
        </UnorderedList>
      </Box>
      <Box width={['100%', '50%']} height={['auto', '100%']} overflow="auto">
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

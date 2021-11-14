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
          Tensorflow playground
        </Heading>
        <UnorderedList spacing="4px" paddingTop="1rem">
          <ListItem>
            <ChakraLink as={Link} href="/bodypix">
              BodyPix
            </ChakraLink>
          </ListItem>
          <ListItem>
            <ChakraLink as={Link} href="/face-mask">
              FaceMask
            </ChakraLink>
          </ListItem>
        </UnorderedList>
      </Box>
    </Main>
    <DarkModeSwitch />
  </Container>
);

export default Index;

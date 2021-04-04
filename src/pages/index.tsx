import { Link as ChakraLink, Text, Code, List, ListIcon, ListItem } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

import { CTA } from '../components/CTA';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { Footer } from '../components/Footer';
import { Main } from '../components/Main';
import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';

const Index: React.FC = () => (
  <Container height="100vh">
    <Hero />
    <Main>
      <Text>
        Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code> + <Code>typescript</Code>.
      </Text>

      <List spacing={3} my={0}>
        <ListItem>
          <ListIcon as={FaCheckCircle} color="green.500" />
          <ChakraLink isExternal href="https://chakra-ui.com" flexGrow={1} mr={2}>
            Chakra UI
          </ChakraLink>
        </ListItem>
        <ListItem>
          <ListIcon as={FaCheckCircle} color="green.500" />
          <ChakraLink isExternal href="https://nextjs.org" flexGrow={1} mr={2}>
            Next.js
          </ChakraLink>
        </ListItem>
      </List>
    </Main>

    <DarkModeSwitch />
    <Footer>
      <Text>Next ❤️ Chakra</Text>
    </Footer>
    <CTA />
  </Container>
);

export default Index;

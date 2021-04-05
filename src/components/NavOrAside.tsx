import { Box, Heading, Link as ChakraLink, Text, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

export const NavOrAside = () => {
  return (
    <Box display={['flex', 'block']} justifyContent={['space-between', 'normal']} alignItems="baseline">
      <Link href="/">
        <Heading flexShrink={0} cursor="pointer">
          Hank Lin
        </Heading>
      </Link>
      <Flex direction={['row', 'column']}>
        <ChakraLink href="https://github.com/jyunhanlin" target="_blank" rel="noreferrer noopener" padding="8px">
          <Flex alignItems="center">
            <FiGithub />
            <Text display={['none', 'revert']} paddingLeft="8px">
              GitHub
            </Text>
          </Flex>
        </ChakraLink>
        <ChakraLink href="https://twitter.com/jhlin1986" target="_blank" rel="noreferrer noopener" padding="8px">
          <Flex alignItems="center">
            <FiTwitter />
            <Text display={['none', 'revert']} paddingLeft="8px">
              Twitter
            </Text>
          </Flex>
        </ChakraLink>
        <ChakraLink
          href="https://www.linkedin.com/in/jyunhanlin/"
          target="_blank"
          rel="noreferrer noopener"
          padding="8px"
        >
          <Flex alignItems="center">
            <FiLinkedin />
            <Text display={['none', 'revert']} paddingLeft="8px">
              Linkedin
            </Text>
          </Flex>
        </ChakraLink>
      </Flex>
    </Box>
  );
};

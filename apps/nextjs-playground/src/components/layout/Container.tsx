'use client';
import { Box, useColorMode, BoxProps } from '@chakra-ui/react';

export const Container = (props: BoxProps) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'gray.50', dark: 'gray.700' };
  const color = { light: 'black', dark: 'white' };

  return <Box bg={bgColor[colorMode]} color={color[colorMode]} {...props} />;
};

import { extendTheme } from '@chakra-ui/react';

const fonts = {
  body: `'Fira Mono', system-ui, sans-serif`,
  heading: `'Fira Mono', Georgia, serif`,
  mono: `'Fira Mono', 'Menlo', monospace`,
};

const breakpoints = {
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
};

const theme = extendTheme({
  fonts,
  breakpoints,
});

export default theme;

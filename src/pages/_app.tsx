import { ChakraProvider } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import theme from '@/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Hank Lin</title>
      </Head>
      <Global
        styles={css`
          html,
          body,
          div#__next {
            height: 100%;
          }
        `}
      />
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;

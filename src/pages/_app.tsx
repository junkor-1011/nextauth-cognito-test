/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';

import type { AppProps } from 'next/app';

// eslint-disable-next-line arrow-body-style
const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;

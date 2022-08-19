/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';

import type { AppProps } from 'next/app';
// import type { Session } from 'next-auth/react';

// eslint-disable-next-line arrow-body-style
const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;

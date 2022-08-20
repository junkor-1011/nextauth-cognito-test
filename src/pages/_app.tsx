/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import React from 'react';

import type { AppProps } from 'next/app';

// eslint-disable-next-line arrow-body-style
const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <RecoilRoot>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <Component {...pageProps} />
      </SessionProvider>
    </RecoilRoot>
  );
};

export default App;

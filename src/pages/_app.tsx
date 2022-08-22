/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import React from 'react';

import type { AppProps } from 'next/app';
import type { NextPage } from 'next';

type GetLayout = (page: React.ReactElement) => React.ReactNode;
type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout: GetLayout;
};
type AppPropsWithLayout<P = {}> = AppProps<P> & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <RecoilRoot>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <SessionProvider session={session} refetchInterval={5 * 60}>
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    </RecoilRoot>
  );
};

export default App;

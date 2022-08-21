/* eslint-disable import/prefer-default-export */
import type React from 'react';
import { useSession } from 'next-auth/react';

import { isValidCustomSession } from '@/lib/types/TypeValidation/nextauth-extention';
import CognitoSignIn from '@/components/page/CognitoSignIn';
// import type { CustomSession } from '@/types/nextauth-extends';

type CheckLoginProps = {
  children: React.ReactNode;
};

export const CheckLogin: React.FC<CheckLoginProps> = ({ children }) => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    // or display 'Loading'
    return null;
  }
  if (!session || !isValidCustomSession(session)) {
    return <CognitoSignIn />;
  }
  // exp: unixtime of expiration date (sec)
  const { exp } = session;
  const current: number = new Date().getTime(); // current timestamp(msec)

  // check expiration
  if (exp * 1000 > current) {
    return <CognitoSignIn authError="expired" />;
  }

  return <div>{children}</div>;
};

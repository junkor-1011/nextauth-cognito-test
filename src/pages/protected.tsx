import { useSession, signIn, signOut } from 'next-auth/react';

import type React from 'react';

const Home: React.VFC = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return null;
  }

  if (session) {
    return (
      <>
        {/* Signed in as {session?.user?.name || JSON.stringify(session?.user)} (email: {session?.user?.email}) <br/> */}
        Signed in as {session['cognito:username']} <br />
        {/* eslint-disable-next-line react/button-has-type */}
        <button onClick={() => signOut()}>Sign Out</button>
        <br />
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      {/* eslint-disable-next-line react/button-has-type */}
      <button onClick={() => signIn('cognito')}>Sign in</button>
    </>
  );
};
export default Home;

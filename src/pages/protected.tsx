import { useSession, signIn, signOut } from 'next-auth/react';

import type React from 'react';

const Groups: React.FC<{ groups: string[] }> = ({ groups }) => {
  if (groups.length < 1) return <p>No Group.</p>;
  return (
    <div>
      <p>Groups:</p>
      <ul>
        {groups.map((group: string) => (
          <li key={group}>{group}</li>
        ))}
      </ul>
    </div>
  );
};

const Home: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return null;
  }

  if (session) {
    const groups = session['cognito:groups'] as string[]; // TMP, TODO: modify types
    return (
      <>
        {/* Signed in as {session?.user?.name || JSON.stringify(session?.user)} (email: {session?.user?.email}) <br/> */}
        Signed in as {session['cognito:username']} <br />
        {/* eslint-disable-next-line react/button-has-type */}
        <button onClick={() => signOut()}>Sign Out</button>
        <br />
        <Groups groups={groups} />
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

/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
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

const ShowCustomKey: React.FC<{ id: string; value: string }> = ({ id, value }) => {
  if (!value)
    return (
      <div>
        <p>id {id}: NO DATA.</p>
      </div>
    );
  const values: string[] = value.split(' ').filter((x) => !!x);
  return (
    <div>
      <p>id {id} Data:</p>
      <ul>
        {values.map((val: string) => (
          <li key={val}>{val}</li>
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
    const value1: string = (session?.customKey1 as string) || ''; // TMP, TODO: modify types
    const value2: string = (session?.customKey2 as string) || ''; // TMP, TODO: modify types
    const value3: string = (session?.customKey3 as string) || ''; // TMP, TODO: modify types
    return (
      <>
        {/* Signed in as {session?.user?.name || JSON.stringify(session?.user)} (email: {session?.user?.email}) <br/> */}
        Signed in as {session['cognito:username']} <br />
        <button onClick={() => signOut()}>Sign Out</button>
        <br />
        <Groups groups={groups} />
        <ShowCustomKey id="1" value={value1} />
        <ShowCustomKey id="2" value={value2} />
        <ShowCustomKey id="3" value={value3} />
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn('cognito')}>Sign in</button>
    </>
  );
};
export default Home;

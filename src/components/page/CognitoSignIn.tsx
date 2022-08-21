/* eslint-disable import/prefer-default-export */
import React from 'react';

import { signIn } from 'next-auth/react';

const CognitoSignIn: React.FC<{ authError?: string }> = ({ authError }) => {
  const errTxt1: string = authError ? 'Authorization Error' : '';
  const errTxt: string = errTxt1; // TODO: add errTxt2 according to contents of Error

  return (
    <div>
      <h1>
        <span style={{ color: 'red' }}>{errTxt ? `${errTxt}.` : ''}</span>
        Please SignIn.
      </h1>
      <p>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <button type="button" onClick={() => signIn('cognito')}>
          SignIn
        </button>
      </p>
    </div>
  );
};
export default CognitoSignIn;

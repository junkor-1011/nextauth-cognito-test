/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/require-await */

import NextAuth from 'next-auth';
import CognitoProvider from 'next-auth/providers/cognito';

import Logger from '@/lib/logger';

import type { CustomJwtToken, CustomSession } from '@/types/nextauth-extends';

const logger = new Logger(process.env.LOG_LEVEL);

export default NextAuth({
  logger: {
    error(code, metadata) {
      logger.error(code, metadata);
    },
    warn(code) {
      logger.warn(code);
    },
    debug(code, metadata) {
      logger.debug(code, metadata);
    },
  },
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID || '',
      clientSecret: process.env.COGNITO_CLIENT_SECRET || '',
      issuer: process.env.COGNITO_ISSUER,
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async session({ session, user, token }): Promise<CustomSession> {
      // console.log('session')
      // console.log('session', 'session', session);
      // console.log('session', 'user', user);
      // console.log('session', 'token', token);
      const tokenObj = token as CustomJwtToken; // TODO: add user define type-guard
      const {
        idToken,
        // accessToken,
        // refreshToken,
        cognitoUsername,
        cognitoGroups,
        customKey1,
        customKey2,
        customKey3,
      } = tokenObj;
      const sessionNew: CustomSession = {
        ...session,
        idToken,
        // accessToken,
        // refreshToken,
        cognitoUsername,
        cognitoGroups,
        customKey1,
        customKey2,
        customKey3,
      };
      return sessionNew;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log('jwt callback');
      // console.log('token', token)
      // console.log('user', user)
      // console.log('account', account)
      // console.log('profile', profile)
      // console.log('isNewUser', isNewUser)

      // TODO: add user define type-guard for account & profile
      if (!account) {
        // console.log('no account in jwt');
        return token;
      }
      const { id_token: idToken, access_token: accessToken, refresh_token: refreshToken } = account;
      if (!idToken || !accessToken || !refreshToken) {
        console.log(
          'lack of oidc token(s): idToken, accessToken, refreshToken: ',
          idToken,
          accessToken,
          refreshToken,
        );
        return token;
      }

      if (!profile) {
        // console.log('no profile in jwt');
        return token;
      }

      const cognitoUsername = profile['cognito:username'];
      if (typeof cognitoUsername !== 'string') {
        // console.log('no cognito:username in profile');
        return token;
      }

      // NOTE: cognito:groups -> string[] or undefined because of cognito's specification.
      const cognitoGroups = (profile['cognito:groups'] || []) as string[];

      // NOTE: custom claim is string or undefined
      const customKey1 = (profile?.customKey1 || '') as string;
      const customKey2 = (profile?.customKey2 || '') as string;
      const customKey3 = (profile?.customKey3 || '') as string;

      const tokenNew: CustomJwtToken = {
        ...token,
        idToken,
        // accessToken,
        // refreshToken,
        cognitoUsername,
        cognitoGroups,
        customKey1,
        customKey2,
        customKey3,
      };

      logger.info('sign in: ', tokenNew.cognitoUsername);

      return tokenNew;
    },
  },
});

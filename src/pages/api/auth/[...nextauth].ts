/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/require-await */

import NextAuth from 'next-auth';
import CognitoProvider from 'next-auth/providers/cognito';

import Logger from '@/lib/logger';
import { isValidCustomSession } from '@/lib/types/TypeValidation/nextauth-extention';

import type { Session } from 'next-auth';
import type {
  CustomJwtToken,
  // CustomSession
} from '@/types/nextauth-extends';
// import { JWT } from 'next-auth/jwt';

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
    async session({
      session,
      //  user,
      token,
    }): Promise<Session> {
      const {
        idToken,
        // accessToken,
        // refreshToken,
        cognitoUsername,
        cognitoGroups,
        customKey1,
        customKey2,
        customKey3,
        iat,
        exp,
        expires,
      } = token;
      const sessionNew = {
        ...session,
        idToken,
        // accessToken,
        // refreshToken,
        cognitoUsername,
        cognitoGroups,
        customKey1,
        customKey2,
        customKey3,
        iat,
        exp,
        expires,
      } as const;
      logger.debug('sessionNew: ', sessionNew);
      if (!isValidCustomSession(sessionNew)) {
        return session; // TMP TODO: improve
      }
      return sessionNew;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async jwt({ token, user, account, profile, isNewUser }) {
      // TODO: add user define type-guard for account & profile
      if (!account) {
        // console.log('no account in jwt');
        return token;
      }
      const { id_token: idToken, access_token: accessToken, refresh_token: refreshToken } = account;
      if (!idToken || !accessToken || !refreshToken) {
        logger.debug(
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

      const { iat, exp } = profile;
      if (typeof iat !== 'number') {
        return token;
      }
      if (typeof exp !== 'number') {
        return token;
      }
      const expires = new Date(exp * 1000).toISOString();

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
        iat,
        exp,
        expires,
      };

      logger.info('sign in: ', tokenNew.cognitoUsername);

      return tokenNew;
    },
  },
});

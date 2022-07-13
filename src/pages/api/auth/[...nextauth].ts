// eslint-disable no-console
// eslint-disable no-param-reassign

import NextAuth from 'next-auth';
import CognitoProvider from 'next-auth/providers/cognito';

export default NextAuth({
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID || '',
      clientSecret: process.env.COGNITO_CLIENT_SECRET || '',
      issuer: process.env.COGNITO_ISSUER,
    }),
  ],
  callbacks: {
    // eslint-disable-next-line no-unused-vars
    async session({ session, user, token }) {
      // console.log('session')
      // console.log('session', 'session', session);
      // console.log('session', 'user', user);
      // console.log('session', 'token', token);
      const sessionNew = { ...session };
      sessionNew.idToken = token?.idToken;
      sessionNew.accessToken = token?.accessToken;
      sessionNew.refreshToken = token?.refreshToken;
      sessionNew['cognito:username'] = token['cognito:username'];
      return sessionNew;
    },
    // eslint-disable-next-line no-unused-vars
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log('jwt callback');
      // console.log('token', token)
      // console.log('user', user)
      // console.log('account', account)
      // console.log('profile', profile)
      // console.log('isNewUser', isNewUser)
      const tokenNew = { ...token };
      if (account) {
        tokenNew.idToken = account?.id_token;
        tokenNew.accessToken = account?.access_token;
        tokenNew.refreshToken = account?.refresh_token;
      }
      if (profile) {
        tokenNew['cognito:username'] = profile['cognito:username'];
      }

      return tokenNew;
    },
  },
});

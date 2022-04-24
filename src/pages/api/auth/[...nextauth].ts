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
  // secret: process.env.NEXTAUTH_SECRET,
  /*
  callbacks: {
    async session({ session, user, token }) {
      // eslint-disable-next-line no-console
      console.log(session, user, token);
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // eslint-disable-next-line no-console
      console.log('jwt callback');
      // eslint-disable-next-line no-console
      console.log(token, user, account, profile, isNewUser);
      return token;
    },
  },
  */
});

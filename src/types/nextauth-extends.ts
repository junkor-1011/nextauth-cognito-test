import type { JWT } from 'next-auth/jwt';
import type { Session } from 'next-auth';

export type OIDCToken = JWT & {
  readonly idToken: string;
  readonly accessToken?: string;
  readonly refreshToken?: string;
};

export type CustomJwtToken = OIDCToken & {
  readonly cognitoUsername: string; // cognito:username
  readonly cognitoGroups: string[]; // cognito:groups
  readonly customKey1: string;
  readonly customKey2: string;
  readonly customKey3: string;
  readonly iat: number;
  readonly exp: number;
  readonly expires: string;
};

export type CustomSession = Session & {
  readonly idToken: string;
  readonly accessToken?: string;
  readonly refreshToken?: string;
  readonly cognitoUsername: string; // cognito:username
  readonly cognitoGroups: string[]; // cognito:groups
  readonly customKey1: string;
  readonly customKey2: string;
  readonly customKey3: string;
  readonly iat: number;
  readonly exp: number;
  readonly expires: string;
};

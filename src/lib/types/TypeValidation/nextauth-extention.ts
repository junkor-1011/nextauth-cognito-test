/* eslint-disable import/prefer-default-export */
import type { CustomSession } from '@/types/nextauth-extends';

import { isNotNullish } from './utils';

export const isValidCustomSession = (x: unknown): x is CustomSession => {
  if (!isNotNullish(x)) return false;

  if (typeof x.idToken !== 'string') return false;
  if (x.accessToken !== undefined && typeof x.accessToken !== 'string') return false;
  if (x.refreshToken !== undefined && typeof x.refreshToken !== 'string') return false;

  if (typeof x.cognitoUsername !== 'string') return false;
  if (!Array.isArray(x.cognitoGroups)) return false;
  // eslint-disable-next-line no-restricted-syntax
  for (const v of Array.from(x.cognitoGroups)) {
    if (typeof v !== 'string') return false;
  }

  if (typeof x.customKey1 !== 'string') return false;
  if (typeof x.customKey2 !== 'string') return false;
  if (typeof x.customKey3 !== 'string') return false;

  // original nextauth's property
  if (typeof x.expires !== 'string') return false;

  return true;
};

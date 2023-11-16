import crypto from 'crypto';
import { getSecret } from './getStatic';

export const random = () => crypto.randomBytes(128).toString('base64');

export const tokenHash = (salt: string, id): string => {
  return crypto
    .createHmac('sha256', [salt, id].join('/'))
    .update(getSecret())
    .digest('hex');
};

export const passwordHash = (salt: string, password: string): string => {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(getSecret())
    .digest('hex');
};

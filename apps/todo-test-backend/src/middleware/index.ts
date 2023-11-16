import express from 'express';
import { FindAccountByToken } from '../accounts/account.model';
import { merge } from 'lodash';

export interface TokenRequest extends express.Request {
  token?: string;
}

export const isAuthenticated = async (
  req: TokenRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const cookie = req.cookies['AT'];

    if (!cookie) {
      return res.sendStatus(403);
    }

    const existingUser = await FindAccountByToken(cookie);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    req.token = cookie;

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
};

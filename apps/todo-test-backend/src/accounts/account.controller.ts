import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import {
  AddAccount,
  FindAccountByToken,
  FindAccountByUsername,
  RemoveAccountByToken,
  UpdateAccountByToken,
} from './account.model';
import { passwordHash } from '../helpers/numberGenerator';
import { TokenRequest } from '../middleware';

class AccountController {
  public async ValidateUser(req: Request, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let response = {
        username: false,
        password: false,
      };

      const user = await FindAccountByUsername(
        req.body.username,
        '+authentication.token +authentication.salt +authentication.password'
      );

      if (!user) return res.status(207).json({ response });
      response.username = true;

      if (
        user.authentication.password !=
        passwordHash(user.authentication.salt, req.body.password)
      )
        return res.status(207).json({ response });
      response.password = true;

      return res
        .status(200)
        .cookie('AT', user.authentication.token, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
        })
        .json({ response });
    } catch (e) {
      return res.json({ warning: 'Internal Server Error' }).status(500);
    }
  }

  public async CreateUser(req: Request, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const isCreated = await AddAccount({
        username: req.body.username,
        password: req.body.password,
      });
      if (!isCreated) return res.status(207).json({ isCreated: isCreated });

      res.cookie(
        'AT',
        await FindAccountByUsername(
          req.body.username,
          '+authentication.token'
        ).then((value) => value.authentication.token),
        {
          maxAge: 30 * 24 * 60 * 60 * 1000,
        }
      );

      return res.status(200).json({ isCreated: isCreated }).end();
    } catch (e) {
      return res.json({ warning: 'Internal Server Error' }).status(500);
    }
  }

  public async Logout(req: Request, res: Response): Promise<Response> {
    try {
      return res.clearCookie('AT').status(200).end();
    } catch (e) {
      return res.json({ warning: 'Internal Server Error' }).status(500);
    }
  }

  public async UpdateUser(req: TokenRequest, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let response = {
        password: false,
        isUpdated: false,
      };

      if (
        await FindAccountByToken(
          req.token,
          '+authentication.salt +authentication.password'
        ).then(
          (value) =>
            value.authentication.password !=
            passwordHash(value.authentication.salt, req.body.password)
        )
      )
        return res
          .status(207)
          .json({
            response,
            warning: 'Wrong password',
          })
          .end();

      response.password = true;

      if (await FindAccountByUsername(req.body.newUsername))
        return res
          .status(207)
          .json({
            response,
            warning: 'Username already Exists',
          })
          .end();

      response.isUpdated = await UpdateAccountByToken(
        req.token,
        req.body.newUsername,
        req.body.newPassword
      );
      if (!response.isUpdated)
        return res.status(207).json({
          response,
          warning: 'Failed to update user info',
        });

      return res.status(200).json({ response }).end();
    } catch (e) {
      return res.json({ warning: 'Internal Server Error' }).status(500);
    }
  }

  public async DeleteUser(req: TokenRequest, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let passwordValidation = true;

      if (
        await FindAccountByToken(
          req.token,
          '+authentication.salt +authentication.password'
        ).then(
          (value) =>
            value.authentication.password !=
            passwordHash(value.authentication.salt, req.body.password)
        )
      )
        return res
          .status(207)
          .json({
            passwordValidation,
            warning: 'Wrong password',
          })
          .end();

      passwordValidation = true;

      await RemoveAccountByToken(req.token);

      return res
        .clearCookie('AT')
        .status(200)
        .json({ passwordValidation })
        .end();
    } catch (e) {
      return res.json({ warning: 'Internal Server Error' }).status(500);
    }
  }
}

export const accountController = new AccountController();

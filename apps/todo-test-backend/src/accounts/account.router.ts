import { Router } from 'express';
import {
  deleteValidation,
  loginValidation,
  registerValidation,
  updateValidation,
} from './account.validator';
import { accountController } from './account.controller';
import { isAuthenticated } from '../middleware';

export const accountRouter: Router = Router();

accountRouter.post('/account', loginValidation, accountController.ValidateUser);
accountRouter.put('/account', registerValidation, accountController.CreateUser);
accountRouter.get('/account', isAuthenticated, accountController.Logout);
accountRouter.patch(
  '/account',
  isAuthenticated,
  updateValidation,
  accountController.UpdateUser
);
accountRouter.delete(
  '/account',
  isAuthenticated,
  deleteValidation,
  accountController.DeleteUser
);

import { body, ValidationChain } from 'express-validator';

export const loginValidation: ValidationChain[] = [
  body('username')
    .notEmpty()
    .withMessage('Username not given')
    .trim()
    .isString()
    .withMessage('Incorrect format'),

  body('password')
    .notEmpty()
    .withMessage('Password not given')
    .trim()
    .isString()
    .withMessage('Incorrect format'),
];

export const registerValidation: ValidationChain[] = [
  body('username')
    .notEmpty()
    .withMessage('Username not given')
    .trim()
    .isString()
    .withMessage('Incorrect format'),

  body('password')
    .notEmpty()
    .withMessage('Password not given')
    .trim()
    .isString()
    .withMessage('Incorrect format'),
];

export const updateValidation: ValidationChain[] = [
  body('password')
    .notEmpty()
    .withMessage('Password not given')
    .trim()
    .isString()
    .withMessage('Incorrect format'),

  body('newUsername').trim().isString().withMessage('Incorrect format'),

  body('newPassword').trim().isString().withMessage('Incorrect format'),
];

export const deleteValidation: ValidationChain[] = [
  body('password')
    .notEmpty()
    .withMessage('Password not given')
    .trim()
    .isString()
    .withMessage('Incorrect format'),
];

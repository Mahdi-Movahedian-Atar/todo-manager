import { body, ValidationChain } from 'express-validator';

export const addTaskValidation: ValidationChain[] = [
  body('task.*.title')
    .notEmpty()
    .withMessage('Title not given')
    .trim()
    .isString()
    .withMessage('Incorrect format'),
  body('task.*.state')
    .notEmpty()
    .withMessage('state not given')
    .trim()
    .isString()
    .withMessage('Incorrect format'),
  body('task.*.description').trim().isString().withMessage('Incorrect format'),
  body('task.*.startDate')
    .trim()
    .isString()
    .withMessage('Incorrect format')
    .toDate(),
  body('task.*.endDate')
    .trim()
    .isString()
    .withMessage('Incorrect format')
    .toDate(),
];

export const removeTaskValidation: ValidationChain[] = [
  body('taskIndex')
    .notEmpty()
    .withMessage('Index not given')
    .trim()
    .isDecimal()
    .withMessage('Incorrect format')
    .toInt(),

  body('taskCount').trim().toInt(),
];

export const updateTaskValidation: ValidationChain[] = [
  body('task.*.index')
    .notEmpty()
    .withMessage('Index not given')
    .trim()
    .isDecimal()
    .withMessage('Incorrect format')
    .toInt(),
  body('task.*.title')
    .notEmpty()
    .withMessage('Title not given')
    .trim()
    .isString()
    .withMessage('Incorrect format'),
  body('task.*.state')
    .notEmpty()
    .withMessage('state not given')
    .trim()
    .isString()
    .withMessage('Incorrect format'),
  body('task.*.description').trim().isString().withMessage('Incorrect format'),
  body('task.*.startDate')
    .trim()
    .isString()
    .withMessage('Incorrect format')
    .toDate(),
  body('task.*.endDate')
    .trim()
    .isString()
    .withMessage('Incorrect format')
    .toDate(),
];

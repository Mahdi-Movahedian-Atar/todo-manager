import { Router } from 'express';
import { isAuthenticated } from '../middleware';
import {
  addTaskValidation,
  removeTaskValidation,
  updateTaskValidation,
} from './task.validator';
import { taskController } from './task.controller';

export const taskRouter: Router = Router();

taskRouter.put(
  '/task',
  isAuthenticated,
  addTaskValidation,
  taskController.AddTask
);

taskRouter.delete(
  '/task',
  isAuthenticated,
  removeTaskValidation,
  taskController.RemoveTask
);

taskRouter.patch(
  '/task',
  isAuthenticated,
  updateTaskValidation,
  taskController.UpdateTask
);

taskRouter.get('/task', isAuthenticated, taskController.GetAllTasks);

import { Request, Response } from 'express';
import { TokenRequest } from '../middleware';
import { validationResult } from 'express-validator';
import {
  FindAccountByToken,
  RemoveAccountByToken,
  UpdateAccountByToken,
} from '../accounts/account.model';
import { passwordHash } from '../helpers/numberGenerator';
import {
  AddTaskToAccount,
  ITask,
  RemoveTaskFromAccount,
  UpdateTaskFromAccount,
} from './task.model';

class TaskController {
  public async AddTask(req: TokenRequest, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let isCreated = false;

      if (!(await AddTaskToAccount(req.token, req.body.task)))
        return res
          .status(207)
          .json({
            isCreated,
            warning: 'Failed to create task',
          })
          .end();

      isCreated = true;
      return res.status(200).json({ isCreated }).end();
    } catch (e) {
      return res.json({ warning: 'Internal Server Error' }).status(500);
    }
  }

  public async RemoveTask(req: TokenRequest, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let isRemoved = false;

      if (
        !(await RemoveTaskFromAccount(
          req.token,
          req.body.taskIndex,
          req.body?.taskCount
        ))
      )
        return res
          .status(207)
          .json({
            isRemoved: isRemoved,
            warning: 'Failed to create task',
          })
          .end();

      isRemoved = true;
      return res.status(200).json({ isRemoved: isRemoved }).end();
    } catch (e) {
      return res.json({ warning: 'Internal Server Error' }).status(500);
    }
  }

  public async UpdateTask(req: TokenRequest, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let isUpdated = false;

      let tasks: { task: ITask; index: number }[] = [];
      req.body.task.forEach((value) =>
        tasks.push({
          task: {
            title: value.title,
            state: value.state,
            description: value?.description,
            startDate: value?.startDate,
            endDate: value?.endDate,
          },
          index: value.index,
        })
      );

      if (!(await UpdateTaskFromAccount(req.token, tasks)))
        return res
          .status(207)
          .json({
            isUpdated: isUpdated,
            warning: 'Failed to create task',
          })
          .end();

      isUpdated = true;
      return res.status(200).json({ isUpdated: isUpdated }).end();
    } catch (e) {
      return res.json({ warning: 'Internal Server Error' }).status(500);
    }
  }

  public async GetAllTasks(
    req: TokenRequest,
    res: Response
  ): Promise<Response> {
    try {
      let tasks: any[] = [];
      const account = await FindAccountByToken(req.token);

      for (let i = 0; i < account.tasks.length; i++) {
        tasks.push({
          title: account.tasks[i].title,
          state: account.tasks[i].state,
          description: account.tasks[i]?.description,
          startDate: account.tasks[i]?.startDate,
          endDate: account.tasks[i]?.endDate,
          index: i,
        });
      }

      return res.status(200).json(tasks).end();
    } catch (e) {
      return res.json({ warning: 'Internal Server Error' }).status(500);
    }
  }
}

export const taskController = new TaskController();

import { Express } from 'express';
import { accountRouter } from './accounts/account.router';
import { taskRouter } from './tasks/task.router';

export const SetRouters = (app: Express) => {
  app.use(accountRouter);
  app.use(taskRouter);
};

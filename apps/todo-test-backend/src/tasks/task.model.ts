import { AccountModel } from '../accounts/account.model';

export interface ITask {
  title: string;
  state: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
}

export const AddTaskToAccount = async (
  token: string,
  tasks: ITask[]
): Promise<boolean> => {
  const query = await AccountModel.findOne({ 'authentication.token': token });

  if (query) {
    tasks.forEach((value) => query.tasks.push(value));
    query.save();
    return true;
  }
  return false;
};

export const RemoveTaskFromAccount = async (
  token: string,
  index: number,
  count: number = 1
): Promise<boolean> => {
  const query = await AccountModel.findOne({ 'authentication.token': token });

  if (query) {
    if (count < 1 || Number.isNaN(count)) count = 1;
    count = count + index;
    let newTasks: ITask[];

    for (let i = 0; i < query.tasks.length; i++) {
      if (index <= i && i < count) continue;
      if (!newTasks) newTasks = [query.tasks[i]];
      else newTasks.push(query.tasks[i]);
    }

    query.tasks = newTasks;
    query.save();
    return true;
  }
  return false;
};

export const UpdateTaskFromAccount = async (
  token: string,
  tasks: { task: ITask; index: number }[]
): Promise<boolean> => {
  const query = await AccountModel.findOne({ 'authentication.token': token });

  if (query) {
    tasks.forEach((value) => query.tasks.splice(value.index, 1, value.task));
    query.save();
    return true;
  }
  return false;
};

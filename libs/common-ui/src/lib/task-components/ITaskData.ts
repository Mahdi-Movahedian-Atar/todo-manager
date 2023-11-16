import { TaskType } from './task-types';

export interface ITaskData {
  TaskTitle: string;
  TaskStatus: TaskType;
  TaskDescription?: string;
  TaskStartDate?: Date;
  TaskEndDate?: Date;
}

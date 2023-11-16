import { ITaskData } from '../ITaskData';

export interface ITaskCard {
  onTaskChange?: (taskData: ITaskData) => void;
  onTaskDelete?: () => void;
  taskData: ITaskData;
}

import { create } from 'zustand';
import { ITaskData } from '../../../../libs/common-ui/src/lib/task-components/ITaskData';

export interface TaskStore {
  tasks: ITaskData[];
  taskDataSource: {
    date: Date | number;
    idle: number;
    success: number;
    failed: number;
  }[];
  setTask: (newTasks: ITaskData[]) => void;
  addTask: (newTask: ITaskData) => void;
  replaceTask: (newTask: ITaskData, index: number) => void;
  removeTask: (index: number) => void;
}

export const useTaskStore = create<TaskStore>()((set) => ({
  tasks: [],
  taskDataSource: [],
  setTask: (newTasks: ITaskData[]) =>
    set((state) => ({
      tasks: newTasks,
      taskDataSource: setTaskDataSource(newTasks),
    })),
  addTask: (newTask: ITaskData) =>
    set((state) => ({
      tasks: [...state.tasks, newTask],
      taskDataSource: setTaskDataSource([...state.tasks, newTask]),
    })),
  replaceTask: (newTask: ITaskData, index: number) =>
    set((state) => ({
      tasks: [
        ...state.tasks.slice(0, index),
        ...state.tasks.splice(index, 1, newTask),
        ...state.tasks.slice(index + 1, state.tasks.length),
      ],
      taskDataSource: setTaskDataSource([
        ...state.tasks.slice(0, index),
        ...state.tasks.splice(index, 1, newTask),
        ...state.tasks.slice(index + 1, state.tasks.length),
      ]),
    })),
  removeTask: (index: number) =>
    set((state) => ({
      tasks: [
        ...state.tasks.slice(0, index),
        ...state.tasks.slice(index + 1, state.tasks.length),
      ],
      taskDataSource: setTaskDataSource([
        ...state.tasks.slice(0, index),
        ...state.tasks.slice(index + 1, state.tasks.length),
      ]),
    })),
}));

function setTaskDataSource(tasks: ITaskData[]) {
  if (tasks.length == 0) return [];

  let taskDataSource: {
    date: Date | number;
    idle: number;
    success: number;
    failed: number;
  }[] = [];

  tasks.forEach((value) => {
    switch (value.TaskStatus) {
      case 'Idle':
        if (value.TaskStartDate)
          taskDataSource.push({
            date: value.TaskStartDate,
            idle: 1,
            success: 0,
            failed: 0,
          });
        else
          taskDataSource.push({
            date: new Date(),
            idle: 1,
            success: 0,
            failed: 0,
          });
        if (value.TaskEndDate)
          taskDataSource.push({
            date: value.TaskEndDate,
            idle: 1,
            success: 0,
            failed: 0,
          });
        else
          taskDataSource.push({
            date: new Date(),
            idle: 1,
            success: 0,
            failed: 0,
          });
        break;
      case 'Success':
        if (value.TaskStartDate)
          taskDataSource.push({
            date: value.TaskStartDate,
            idle: 0,
            success: 1,
            failed: 0,
          });
        else
          taskDataSource.push({
            date: new Date(),
            idle: 0,
            success: 1,
            failed: 0,
          });
        if (value.TaskEndDate)
          taskDataSource.push({
            date: value.TaskEndDate,
            idle: 0,
            success: 1,
            failed: 0,
          });
        else
          taskDataSource.push({
            date: new Date(),
            idle: 0,
            success: 1,
            failed: 0,
          });
        break;
      case 'Failed':
        if (value.TaskStartDate)
          taskDataSource.push({
            date: value.TaskStartDate,
            idle: 0,
            success: 0,
            failed: 1,
          });
        else
          taskDataSource.push({
            date: new Date(),
            idle: 0,
            success: 0,
            failed: 1,
          });
        if (value.TaskEndDate)
          taskDataSource.push({
            date: value.TaskEndDate,
            idle: 0,
            success: 0,
            failed: 1,
          });
        else
          taskDataSource.push({
            date: new Date(),
            idle: 0,
            success: 0,
            failed: 1,
          });
        break;
    }
  });

  function compare(a: any, b: any) {
    let i: Date = new Date(a.date);
    let j: Date = new Date(b.date);
    if (i.getDate() < j.getDate()) {
      return -1;
    }
    if (i.getDate() > j.getDate()) {
      return 1;
    }
    return 0;
  }

  taskDataSource.sort(compare);

  for (let i = 0; i < taskDataSource.length - 1; i++) {
    let a: Date = new Date(taskDataSource[i].date);
    let b: Date = new Date(taskDataSource[i + 1].date);

    if (
      a.getDay() == b.getDay() &&
      a.getMonth() == b.getMonth() &&
      a.getFullYear() == b.getFullYear()
    ) {
      taskDataSource.splice(i, 2, {
        date: i,
        idle: taskDataSource[i].idle + taskDataSource[i + 1].idle,
        failed: taskDataSource[i].failed + taskDataSource[i + 1].failed,
        success: taskDataSource[i].success + taskDataSource[i + 1].success,
      });
      i--;
    } else {
      taskDataSource[i].date = i;
    }
  }

  taskDataSource[taskDataSource.length - 1].date = taskDataSource.length - 1;

  return taskDataSource;
}

import { useMutation } from 'react-query';
import axios from 'axios';
import { getAddress } from '../get-address';
import { ITaskData } from '../../../../libs/common-ui/src/lib/task-components/ITaskData';

export function AddTaskQuery() {
  return useMutation('AddTaskQuery', (data: ITaskData) => {
    return axios.request({
      method: 'put',
      url: getAddress() + '/task/',
      withCredentials: true,
      data: {
        task: [
          {
            title: data.TaskTitle,
            state: data.TaskStatus,
            description: data.TaskDescription,
            startDate: data.TaskStartDate,
            endDate: data.TaskEndDate,
          },
        ],
      },
    });
  });
}

export function DeleteTaskQuery() {
  return useMutation('DeleteTaskQuery', (index: number) => {
    return axios.request({
      method: 'delete',
      url: getAddress() + '/task/',
      withCredentials: true,
      data: {
        taskIndex: index,
        taskCount: 1,
      },
    });
  });
}

export function UpdateTaskQuery() {
  return useMutation(
    'UpdateTaskQuery',
    (data: { task: ITaskData; index: number }) => {
      return axios.request({
        method: 'patch',
        url: getAddress() + '/task/',
        withCredentials: true,
        data: {
          task: [
            {
              index: data.index,
              title: data.task.TaskTitle,
              state: data.task.TaskStatus,
              description: data.task.TaskDescription,
              startDate: data.task.TaskStartDate,
              endDate: data.task.TaskEndDate,
            },
          ],
        },
      });
    }
  );
}

export function GetTaskQuery() {
  return useMutation('GetTaskQuery', (data: 'data') => {
    return axios.request({
      method: 'get',
      url: getAddress() + '/task/',
      withCredentials: true,
    });
  });
}

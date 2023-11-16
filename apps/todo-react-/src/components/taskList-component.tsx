import { List, ScrollView } from 'devextreme-react';
import TaskCard from '../../../../libs/common-ui/src/lib/task-components/task-card/task-card';
import { useTaskStore } from '../stores/TaskStore';
import { useEffect } from 'react';
import {
  AddTaskQuery,
  DeleteTaskQuery,
  GetTaskQuery,
  UpdateTaskQuery,
} from '../querys/task-query';
import { ITaskData } from '../../../../libs/common-ui/src/lib/task-components/ITaskData';
import { useSettingStore } from '../stores/SettingStore';
import { useNavigate } from 'react-router-dom';

function removeTaskMutation() {
  const { mutate } = DeleteTaskQuery();
  return mutate;
}

function getTaskMutation() {
  const { mutate } = GetTaskQuery();
  return mutate;
}

function updateTaskMutation() {
  const { mutate } = UpdateTaskQuery();
  return mutate;
}

export function TaskListComponent() {
  const getMutation = getTaskMutation();
  const removeMutation = removeTaskMutation();
  const UpdateMutation = updateTaskMutation();
  const { tasks, setTask, removeTask, replaceTask } = useTaskStore();
  const { toggleLoggedIn } = useSettingStore();
  const navigate = useNavigate();

  useEffect(() => {
    let tasks: ITaskData[] = [];

    getMutation('data', {
      onSuccess: (data) => {
        // @ts-ignore
        data.data.forEach((data) =>
          tasks.push({
            TaskTitle: data.title,
            TaskStatus: data.state,
            TaskDescription: data.description,
            TaskStartDate: data.startDate,
            TaskEndDate: data.endDate,
          })
        );
        setTask(tasks);
      },
      onError: () => {
        toggleLoggedIn(false);
        navigate('/Account');
      },
    });
  }, []);

  return (
    <ScrollView className={'flex flex-grow m-2'}>
      <div className={'w-full grid grid-cols-1 xl:grid-cols-2 gap-4'}>
        {tasks.map((task, index) => (
          <TaskCard
            taskData={task}
            onTaskDelete={() => {
              removeMutation(index, {
                onSuccess: (data) => {
                  data.data.isRemoved && removeTask(index);
                },
                onError: () => {
                  toggleLoggedIn(false);
                  navigate('/Account');
                },
              });
            }}
            onTaskChange={(taskData: ITaskData) => {
              UpdateMutation(
                { task: taskData, index: index },
                {
                  onSuccess: (data) => {
                    data.data.isUpdated && replaceTask(taskData, index);
                  },
                  onError: () => {
                    toggleLoggedIn(false);
                    navigate('/Account');
                  },
                }
              );
            }}
          />
        ))}
      </div>
    </ScrollView>
  );
}

import { TaskForm } from '../../../../libs/common-ui/src/lib/task-components/task-form/task-from';
import { ITaskData } from '../../../../libs/common-ui/src/lib/task-components/ITaskData';
import { AddTaskQuery } from '../querys/task-query';
import { useTaskStore } from '../stores/TaskStore';
import { useSettingStore } from '../stores/SettingStore';
import { useNavigate } from 'react-router-dom';
export function TaskFormComponent() {
  const { mutate } = AddTaskQuery();
  const { addTask } = useTaskStore();
  const { toggleLoggedIn } = useSettingStore();
  const navigate = useNavigate();

  return (
    <div className={'@container w-full'}>
      <TaskForm
        getTaskForm={(setData: ITaskData) => {
          mutate(setData, {
            onSuccess: (data) => {
              if (data.data.isCreated) addTask(setData);
            },
            onError: () => {
              toggleLoggedIn(false);
              navigate('/Account');
            },
          });
        }}
      />
    </div>
  );
}

export default TaskFormComponent;

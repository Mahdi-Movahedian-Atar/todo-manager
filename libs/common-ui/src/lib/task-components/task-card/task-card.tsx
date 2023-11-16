import {
  Button,
  DateRangeBox,
  SelectBox,
  TextArea,
  TextBox,
} from 'devextreme-react';
import { TaskType } from '../task-types';
import { useState } from 'react';
import { ITaskCard } from './ITaskCard';
import { ITaskData } from '../ITaskData';

export function TaskCard(props: ITaskCard) {
  const [taskType, setTaskType] = useState<TaskType>(props.taskData.TaskStatus);
  const [isTitleSet, setIsTitleSet] = useState<boolean>(true);

  let {
    onTaskChange = (value: ITaskData) => {},
    onTaskDelete = () => {},
    taskData = {
      TaskTitle: '',
      TaskStatus: 'Idle',
      TaskDescription: '',
      TaskStartDate: new Date(),
      TaskEndDate: new Date(),
    },
  } = props;

  return (
    <div
      className={
        taskType === 'Idle'
          ? 'card-info'
          : taskType === 'Failed'
          ? 'card-danger'
          : 'card-success'
      }
    >
      <div className={'flex flex-col gap-2 m-2'}>
        <div className={'flex flex-row flex-grow flex-wrap gap-2'}>
          <TextBox
            className={`flex-grow basis-full @md:basis-auto ${
              !isTitleSet && 'danger'
            }`}
            stylingMode={'underlined'}
            defaultValue={taskData.TaskTitle}
            onValueChange={(value) => {
              if (value === undefined || value == '') setIsTitleSet(false);
              else {
                if (!isTitleSet) setIsTitleSet(true);
                setIsTitleSet(true);
                taskData.TaskTitle = value;
              }
            }}
          />
          <SelectBox
            className={'flex-shrink basis-full @md:basis-auto'}
            stylingMode={'underlined'}
            items={['Idle', 'Success', 'Failed']}
            defaultValue={taskData.TaskStatus}
            onValueChange={(value) => {
              taskData.TaskStatus = value;
              setTaskType(value);
            }}
          />
        </div>
        <TextArea
          stylingMode={'underlined'}
          autoResizeEnabled={true}
          defaultValue={taskData.TaskDescription}
          onValueChange={(value) => {
            taskData.TaskDescription = value;
          }}
        />
        <DateRangeBox
          stylingMode={'underlined'}
          defaultValue={[taskData.TaskStartDate, taskData.TaskEndDate]}
          onValueChange={(value) => {
            taskData.TaskStartDate = value[0];
            taskData.TaskEndDate = value[1];
          }}
        />
        <div className={'flex flex-row flex-grow flex-wrap gap-2'}>
          <Button
            className={'flex-grow basis-full @md:basis-1/3'}
            text={'Delete task'}
            type={'danger'}
            onClick={() => {
              onTaskDelete();
            }}
          />
          <Button
            className={'flex-grow basis-full @md:basis-1/3'}
            text={'Update task'}
            type={'default'}
            onClick={() => {
              if (isTitleSet) onTaskChange(taskData);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskCard;

import {
  Button,
  DateRangeBox,
  SelectBox,
  TextArea,
  TextBox,
} from 'devextreme-react';

import { useState } from 'react';
import { ITaskData } from '../ITaskData';
import TaskCard from '../task-card/task-card';
import { ITaskForm } from './ITaskForm';

let taskData: ITaskData = {
  TaskTitle: 'New Task',
  TaskStatus: 'Idle',
  TaskDescription: '',
  TaskStartDate: new Date(),
  TaskEndDate: new Date(),
};

export function TaskForm(props: ITaskForm) {
  const [isTitleSet, setIsTitleSet] = useState<boolean>(true);

  const { getTaskForm = (value: ITaskData) => {} } = props;

  return (
    <div className={'flex flex-grow flex-col gap-2 h-fit m-2'}>
      <div className={'flex flex-row flex-grow flex-wrap gap-2'}>
        <TextBox
          className={`flex-grow basis-full @sm:basis-auto ${
            !isTitleSet && 'danger'
          }`}
          onValueChange={(value) => {
            if (value === undefined || value == '') setIsTitleSet(false);
            else {
              if (!isTitleSet) setIsTitleSet(true);
              setIsTitleSet(true);
              taskData.TaskTitle = value;
            }
          }}
          placeholder={'Title'}
          defaultValue={'New Task'}
        />
        <SelectBox
          className={'flex-grow @sm:flex-grow-0 basis-full @sm:basis-auto'}
          items={['Idle', 'Success', 'Failed']}
          defaultValue={'Idle'}
          onValueChange={(value) => {
            taskData.TaskStatus = value;
          }}
        />
      </div>
      <TextArea
        autoResizeEnabled={true}
        onValueChange={(value) => {
          taskData.TaskDescription = value;
        }}
        placeholder={'Description'}
      />
      <DateRangeBox
        onValueChange={(value) => {
          taskData.TaskStartDate = value[0];
          taskData.TaskEndDate = value[1];
        }}
      />
      <Button
        text={'Add Task'}
        type={'default'}
        onClick={() => {
          if (isTitleSet) getTaskForm(taskData);
        }}
      />
    </div>
  );
}

export default TaskCard;

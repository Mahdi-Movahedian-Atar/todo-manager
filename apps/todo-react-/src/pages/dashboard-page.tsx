import { TaskListComponent } from '../components/taskList-component';
import TaskFormComponent from '../components/taskForm-component';
import { Chart } from 'devextreme-react';
import {
  ArgumentAxis,
  CommonSeriesSettings,
  Series,
} from 'devextreme-react/chart';
import { useTaskStore } from '../stores/TaskStore';

export function DashboardPage() {
  const { taskDataSource } = useTaskStore();

  console.log(taskDataSource);

  return (
    <div
      className={
        'flex w-full h-screen bg-gradient-to-br from-primary-light dark:from-primary-dark bg-primary-middle'
      }
    >
      <div className={'@container flex flex-grow grid grid-cols-1 grid-rows-4'}>
        <Chart
          className={'basis-full'}
          palette={'Harmony Light'}
          dataSource={taskDataSource}
        >
          <CommonSeriesSettings argumentField={'date'} type={'splinearea'} />
          <Series valueField={'idle'} name={'idle'} color={'#e600ff'} />
          <Series valueField={'failed'} name={'failed'} color={'#ff0000'} />
          <Series valueField={'success'} name={'success'} color={'#5eff00'} />
          <ArgumentAxis valueMarginsEnabled={false} />
        </Chart>
        <div className={'row-span-3'}>
          <TaskListComponent />
        </div>
      </div>
      <div
        className={
          '@container flex lg:w-[30rem] md:w-[20rem] bg-gradient-to-br from-primary-light dark:from-primary-dark rounded rounded-tl-3xl rounded-br-3xl'
        }
      >
        <TaskFormComponent />
      </div>
    </div>
  );
}

export default DashboardPage;

import { UpdateComponent } from '../components/update-component';

export function UpdatePage() {
  return (
    <div
      className={
        'flex justify-center bg-gradient-to-br from-primary-light dark:from-primary-dark bg-primary-middle w-screen h-screen'
      }
    >
      <div className={'@container self-center w-80 card'}>
        <UpdateComponent />
      </div>
    </div>
  );
}

export default UpdatePage;

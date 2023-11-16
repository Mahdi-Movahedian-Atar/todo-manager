import { RegisterComponent } from '../components/register-component';

export function RegisterPage() {
  return (
    <div
      className={
        'flex justify-center bg-gradient-to-br from-primary-light dark:from-primary-dark bg-primary-middle w-screen h-screen'
      }
    >
      <div className={'@container self-center w-80 card'}>
        <RegisterComponent />
      </div>
    </div>
  );
}

export default RegisterPage;

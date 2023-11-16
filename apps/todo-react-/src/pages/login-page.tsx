import LoginComponent from '../components/login-component';

export function LoginPage() {
  return (
    <div
      className={
        'flex justify-center bg-gradient-to-br from-primary-light dark:from-primary-dark bg-primary-middle w-screen h-screen'
      }
    >
      <div className={'@container self-center w-80 card'}>
        <LoginComponent />
      </div>
    </div>
  );
}

export default LoginPage;

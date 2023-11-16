/* eslint-disable-next-line */
import LoginForm from '../../../../libs/common-ui/src/lib/login-components/login-form/login-form';
import { LoginQuery } from '../querys/login-query';
import { ILoginFormValidation } from '../../../../libs/common-ui/src/lib/login-components/login-form/ILoginFormValidation';
import { useSettingStore } from '../stores/SettingStore';
import { useNavigate } from 'react-router-dom';

let loginData: { username: string; password: string } = {
  username: '',
  password: '',
};

export function LoginComponent() {
  const navigate = useNavigate();
  const { toggleLoggedIn } = useSettingStore();
  const { mutate } = LoginQuery();
  const navigateToRegister = () => navigate('/Register');

  return (
    <LoginForm
      getValidation={(username, password) => {
        if (username !== undefined) loginData.username = username;
        if (password !== undefined) loginData.password = password;
      }}
      setValidation={() => {
        if (loginData.username == '' && loginData.password == '')
          return {
            username: false,
            password: false,
            message: 'Username & password are not given',
          };
        if (loginData.username == '')
          return {
            username: false,
            password: true,
            message: 'Username is not given',
          };
        if (loginData.password == '')
          return {
            username: true,
            password: false,
            message: 'Password is not given',
          };
        let results: ILoginFormValidation = {
          username: false,
          password: false,
          message: 'Error',
        };
        mutate(loginData, {
          onSuccess: (data) => {
            results.username = data.data.response.username;
            results.password = data.data.response.password;
            results.message = 'Logged In';
            if (!results.username) {
              results.message = 'Wrong username';
            } else if (!results.password) results.message = 'Wrong password';
          },
          onError: (error) => {
            // @ts-ignore
            results.message = error.message;
          },
        });
        return results;
      }}
      onSuccess={() => {
        toggleLoggedIn(true);
        navigate('/Dashboard');
      }}
      onRegister={navigateToRegister}
    />
  );
}

export default LoginComponent;

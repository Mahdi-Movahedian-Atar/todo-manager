import RegisterForm from '../../../../libs/common-ui/src/lib/login-components/register-form/register-form';
import { useNavigate } from 'react-router-dom';
import { useSettingStore } from '../stores/SettingStore';
import { RegisterQuery } from '../querys/login-query';
import { IRegisterFormValidation } from '../../../../libs/common-ui/src/lib/login-components/register-form/IRegisterFormValidation';

let registerData: { username: string; password: string } = {
  username: '',
  password: '',
};

export function RegisterComponent() {
  const navigate = useNavigate();
  const { toggleLoggedIn } = useSettingStore();
  const { mutate } = RegisterQuery();

  let toggle = false;

  return (
    <RegisterForm
      getUserValidation={(username, password) => {
        registerData.username = username;
        registerData.password = password;
      }}
      setUser={() => {
        if (registerData.username == '' && registerData.password == '')
          return {
            username: false,
            password: false,
            message: 'Username & password are not given',
          };
        if (registerData.username == '')
          return {
            username: false,
            password: true,
            message: 'Username is not given',
          };
        if (registerData.password == '')
          return {
            username: true,
            password: false,
            message: 'Password is not given',
          };
        let results: IRegisterFormValidation = {
          username: false,
          password: false,
          message: 'Error',
        };
        mutate(registerData, {
          onSuccess: (data) => {
            results.username = data.data.isCreated;
            results.password = true;
            results.message = 'Registered';
            if (!results.username) {
              results.message = 'Username exists';
            } else toggle = true;
          },
          onError: (error) => {
            // @ts-ignore
            results.message = error.message;
          },
        });
        useSettingStore.setState({ loggedIn: toggle });
        return results;
      }}
      onLogin={() => navigate('/Account')}
      onSuccess={() => {
        toggleLoggedIn(true);
        navigate('/Dashboard');
      }}
    />
  );
}

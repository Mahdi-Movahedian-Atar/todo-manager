/* eslint-disable-next-line */
import { Button, TextBox, Toast } from 'devextreme-react';
import { useState } from 'react';
import { wait } from 'nx-cloud/lib/utilities/waiter';
import { IRegisterForm } from './IRegisterForm';
import { IRegisterFormValidation } from './IRegisterFormValidation';

let username: string;
let password: string;
let confirmPassword: string;

export function RegisterForm(props: IRegisterForm) {
  const [validateValue, setValidateValue] = useState<IRegisterFormValidation>({
    username: true,
    password: true,
    message: '',
  });

  const [toastConfig, setToastConfig] = useState({
    warning: false,
    isVisible: false,
  });

  let {
    getUserValidation = (username: string, password: string) => {},
    setUser = () => ({
      username: false,
      password: false,
      message: 'Undefined',
    }),
    onLogin = () => {},
    onSuccess = () => {},
  } = props;

  return (
    <div className={'@container'}>
      <div className={'grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-4'}>
        <TextBox
          className={`m-2 @sm:col-span-2 @md:col-span-1 ${
            !validateValue.username && 'danger'
          }`}
          showClearButton={true}
          placeholder={'Username'}
          onValueChange={(value) => (username = value)}
        />
        <TextBox
          className={`m-2 ${!validateValue.password && 'danger'}`}
          mode={'password'}
          placeholder={'Password'}
          showClearButton={true}
          onValueChange={(value) => (password = value)}
        />
        <TextBox
          className={`m-2 ${!validateValue.password && 'danger'}`}
          mode={'password'}
          placeholder={'Confirm Password'}
          showClearButton={true}
          onValueChange={(value) => (confirmPassword = value)}
        />
        <Button
          className={'m-2 @sm:col-span-2 @md:col-span-1'}
          text={'Register'}
          type={'default'}
          onClick={() => {
            setToastConfig({ ...toastConfig, isVisible: false });
            setValidateValue({
              ...validateValue,
              username: true,
              password: true,
            });

            if (!username) {
              wait(500).then(() => {
                setValidateValue({
                  username: false,
                  password: false,
                  message: 'Username not given',
                });
                setToastConfig({
                  warning: false,
                  isVisible: true,
                });
              });
              return;
            }

            if (!password || password != confirmPassword) {
              wait(500).then(() => {
                setValidateValue({
                  username: true,
                  password: false,
                  message: 'Passwords does not match',
                });
                setToastConfig({
                  warning: false,
                  isVisible: true,
                });
              });
              return;
            }

            getUserValidation(username, password);
            let results = setUser();
            wait(500).then(() => {
              setValidateValue(results);
              setToastConfig({
                warning: results.username && results.password,
                isVisible: true,
              });
            });
            if (validateValue.username && validateValue.password) onSuccess();
          }}
        />
        <Button
          className={'m-2 @sm:col-span-2 @md:col-span-1'}
          text={'login'}
          type={'default'}
          onClick={onLogin}
        />
        <Toast
          visible={toastConfig.isVisible}
          type={toastConfig.warning ? 'success' : 'error'}
          message={validateValue.message}
          displayTime={6000}
          onHidden={() =>
            setToastConfig({
              ...toastConfig,
              isVisible: false,
            })
          }
          width={'auto'}
        />
      </div>
    </div>
  );
}

export default RegisterForm;

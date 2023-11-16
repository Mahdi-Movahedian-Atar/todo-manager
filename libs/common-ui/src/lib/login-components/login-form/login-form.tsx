/* eslint-disable-next-line */
import { Button, TextBox, Toast } from 'devextreme-react';
import { useState } from 'react';
import { ILoginForm } from './ILoginForm';
import { ILoginFormValidation } from './ILoginFormValidation';
import { wait } from 'nx-cloud/lib/utilities/waiter';

export function LoginForm(props: ILoginForm) {
  const [validateValue, setValidateValue] = useState<ILoginFormValidation>({
    username: true,
    password: true,
    message: '',
  });

  const [toastConfig, setToastConfig] = useState({
    warning: false,
    isVisible: false,
  });

  let {
    getValidation = (username: string, password: string) => {},
    setValidation = () => ({
      username: false,
      password: false,
      message: 'Undefined',
    }),
    onRegister = () => {},
    onSuccess = () => {},
  } = props;

  let username: string;
  let password: string;

  return (
    <div className={'grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-4'}>
      <TextBox
        className={`m-2 ${!validateValue.username && 'danger'}`}
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
      <Button
        className={'m-2'}
        text={'Login'}
        type={'default'}
        onClick={() => {
          setToastConfig({ ...toastConfig, isVisible: false });
          setValidateValue({
            ...validateValue,
            username: true,
            password: true,
          });
          getValidation(username, password);
          let results = setValidation();
          wait(500).then(() => {
            setValidateValue(results);
            setToastConfig({
              warning: results.username || results.password,
              isVisible: true,
            });
          });
          if (validateValue.username && validateValue.password) onSuccess();
        }}
      />
      <Button
        className={'m-2'}
        text={'Sign in'}
        type={'default'}
        onClick={onRegister}
      />

      <Toast
        visible={toastConfig.isVisible}
        type={toastConfig.warning ? 'success' : 'warning'}
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
  );
}

export default LoginForm;

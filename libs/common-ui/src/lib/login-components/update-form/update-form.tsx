/* eslint-disable-next-line */
import { Button, TextBox, Toast } from 'devextreme-react';
import { useState } from 'react';
import { wait } from 'nx-cloud/lib/utilities/waiter';
import { IUpdateForm } from './IUpdateForm';
import { IUpdateFormValidation } from './IUpdateFormValidation';
import { warning } from 'ionicons/icons';

let password: string;
let newUsername: string;
let newPassword: string;
let confirmNewPassword: string;

export function UpdateForm(props: IUpdateForm) {
  const [validateValue, setValidateValue] = useState<IUpdateFormValidation>({
    password: true,
    newUsername: true,
    newPassword: true,
    message: '',
  });

  const [toastConfig, setToastConfig] = useState({
    warning: false,
    isVisible: false,
  });

  let {
    getUserValidation = (
      password: string,
      newUsername?: string,
      newPassword?: string
    ) => {},
    setUser = () => ({
      password: false,
      newUsername: false,
      newPassword: false,
      message: 'Undefined',
    }),
    onSuccess = () => {},
  } = props;

  return (
    <div className={'@container'}>
      <div className={'grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-5'}>
        <TextBox
          className={`m-2 @sm:col-span-2 @lg:col-span-1 ${
            !validateValue.newUsername && 'danger'
          }`}
          showClearButton={true}
          mode={'password'}
          placeholder={'Password'}
          onValueChange={(value) => (password = value)}
        />
        <TextBox
          className={`m-2 @sm:col-span-2 @lg:col-span-1 ${
            !validateValue.newUsername && 'danger'
          }`}
          showClearButton={true}
          placeholder={'New Username'}
          onValueChange={(value) => (newUsername = value)}
        />
        <TextBox
          className={`m-2 ${!validateValue.newPassword && 'danger'}`}
          mode={'password'}
          placeholder={'New Password'}
          showClearButton={true}
          onValueChange={(value) => (newPassword = value)}
        />
        <TextBox
          className={`m-2 ${!validateValue.newPassword && 'danger'}`}
          mode={'password'}
          placeholder={'Confirm New Password'}
          showClearButton={true}
          onValueChange={(value) => (confirmNewPassword = value)}
        />
        <Button
          className={'m-2 @sm:col-span-2 @lg:col-span-1'}
          text={'Update'}
          type={'default'}
          onClick={() => {
            setToastConfig({ ...toastConfig, isVisible: false });
            setValidateValue({
              ...validateValue,
              password: true,
              newUsername: true,
              newPassword: true,
            });

            if (!password) {
              wait(500).then(() => {
                setValidateValue({
                  password: false,
                  newUsername: false,
                  newPassword: false,
                  message: 'Password can not be empty',
                });
                setToastConfig({
                  warning: false,
                  isVisible: true,
                });
              });
              return;
            }

            if (!newUsername && !newPassword) {
              wait(500).then(() => {
                setValidateValue({
                  password: true,
                  newUsername: false,
                  newPassword: false,
                  message: 'Nothing is changed',
                });
                setToastConfig({
                  warning: false,
                  isVisible: true,
                });
              });
              return;
            }

            if (newPassword && newPassword != confirmNewPassword) {
              wait(500).then(() => {
                setValidateValue({
                  password: true,
                  newUsername: true,
                  newPassword: false,
                  message: 'Passwords does not match',
                });
                setToastConfig({
                  warning: false,
                  isVisible: true,
                });
              });
              return;
            }

            getUserValidation(password, newUsername, newPassword);

            let results = setUser();

            wait(500).then(() => {
              setValidateValue(results);
              setToastConfig({
                warning:
                  results.newUsername &&
                  results.newPassword &&
                  results.password,
                isVisible: true,
              });
            });

            if (results.password && results.newUsername && results.newPassword)
              onSuccess();
          }}
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
    </div>
  );
}

export default UpdateForm;

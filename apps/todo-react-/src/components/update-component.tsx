import RegisterForm from '../../../../libs/common-ui/src/lib/login-components/register-form/register-form';
import { useNavigate } from 'react-router-dom';
import { useSettingStore } from '../stores/SettingStore';
import { IRegisterFormValidation } from '../../../../libs/common-ui/src/lib/login-components/register-form/IRegisterFormValidation';
import UpdateForm from '../../../../libs/common-ui/src/lib/login-components/update-form/update-form';
import { UpdateUser } from '../querys/login-query';
import { IUpdateFormValidation } from '../../../../libs/common-ui/src/lib/login-components/update-form/IUpdateFormValidation';

let updateData: {
  password: string;
  newUsername?: string;
  newPassword?: string;
} = {
  password: '',
  newUsername: '',
  newPassword: '',
};

export function UpdateComponent() {
  const navigate = useNavigate();
  const { toggleLoggedIn } = useSettingStore();
  const { mutate } = UpdateUser();

  return (
    <UpdateForm
      getUserValidation={(
        password: string,
        newUsername?: string,
        newPassword?: string
      ) => {
        updateData.password = password;
        updateData.newUsername = newUsername;
        updateData.newPassword = newPassword;
      }}
      setUser={() => {
        if (updateData.password == '')
          return {
            password: false,
            newUsername: false,
            newPassword: false,
            message: 'password is not given',
          };

        let results: IUpdateFormValidation = {
          password: false,
          newUsername: false,
          newPassword: false,
          message: 'Error',
        };
        mutate(updateData, {
          onSuccess: (data) => {
            results.password = data.data.response.password;
            results.newUsername = data.data.response.isUpdated;
            results.newPassword = data.data.response.isUpdated;
            results.message = 'Updated';
            if (!results.password) {
              results.message = 'Wrong Password';
            } else if (!results.newUsername) {
              results.message = 'Username exists';
            }
          },
          onError: () => {
            toggleLoggedIn(false);
            navigate('/Account');
          },
        });
        return results;
      }}
      onSuccess={() => {
        toggleLoggedIn(true);
        navigate('/Dashboard');
      }}
    />
  );
}

import { Button, SpeedDialAction } from 'devextreme-react';
import { useSettingStore } from '../stores/SettingStore';
import { useNavigate } from 'react-router-dom';
import { LogoutQuery } from '../querys/login-query';

export function Layout(props: { children: React.ReactNode }) {
  const { loggedIn, toggleLoggedIn } = useSettingStore();
  const { mutate } = LogoutQuery();

  const navigate = useNavigate();

  // @ts-ignore
  return (
    <div>
      <div className={'flex flex-nowrap gap-2'}>
        <Button
          className={'flex flex-shrink'}
          text={'Dashboard'}
          type={'default'}
          onClick={() => navigate('/Dashboard')}
          visible={loggedIn}
        />
        <Button
          className={'flex flex-shrink'}
          text={'Logout'}
          type={'danger'}
          onClick={() =>
            mutate(undefined, {
              onSuccess: () => {
                toggleLoggedIn(false);
                navigate('/Account');
              },
              onError: () => {
                toggleLoggedIn(false);
                navigate('/Account');
              },
            })
          }
          visible={loggedIn}
        />
        <Button
          className={'flex flex-shrink'}
          text={'Login'}
          type={'default'}
          onClick={() => navigate('/Account')}
          visible={!loggedIn}
        />
        <Button
          className={'flex flex-shrink'}
          text={'Edit Account'}
          type={'default'}
          onClick={() => navigate('/Update')}
          visible={loggedIn}
        />
      </div>
      {props.children}
    </div>
  );
}

export default Layout;

// eslint-disable-next-line @typescript-eslint/no-unused-vars

import 'devextreme/dist/css/dx.dark.css';
import '../styles.scss';

import LoginPage from '../pages/login-page';

import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useSettingStore } from '../stores/SettingStore';
import { useEffect } from 'react';
import DashboardPage from '../pages/dashboard-page';
import Layout from '../layout/layout';
import RegisterPage from '../pages/register-page';
import UpdatePage from '../pages/update-page';

const queryClient = new QueryClient();

export function App() {
  const { loggedIn } = useSettingStore();
  const navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    if (location.pathname == '/')
      if (!loggedIn) navigate('/Account');
      else navigate('/Dashboard');
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Routes>
          <Route path={'/Dashboard'} element={<DashboardPage />} />
          <Route path={'/Account'} element={<LoginPage />} />
          <Route path={'/Register'} element={<RegisterPage />} />
          <Route path={'/Update'} element={<UpdatePage />} />
        </Routes>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;

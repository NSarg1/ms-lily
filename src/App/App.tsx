import React from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Header } from '@/layout/header/Header';
import { Sidebar } from '@/layout/sidebar/Sidebar';
import { DashboardPage } from '@/pages/dashboard/Dashboard.page';
import { LoginPage } from '@/pages/login/Login';
import { Users } from '@/pages/users/Users';
import { persistor, store } from '@/store/store';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router';
import { Layout, Spin } from 'antd';
import { PersistGate } from 'redux-persist/integration/react';

import styles from './app.module.scss';

const { Content } = Layout;

const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout className={styles.container}>
              <Header />
              <Layout>
                <Sidebar />
                <Layout className={styles.wrapper}>
                  <Content className={styles.main}>
                    <Routes>
                      <Route path="/" element={<DashboardPage />} />
                      <Route path="/users" element={<Users />} />
                      {/* Add more protected routes here */}
                    </Routes>
                  </Content>
                </Layout>
              </Layout>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <Spin size="large" />
          </div>
        }
        persistor={persistor}
      >
        <AppContent />
      </PersistGate>
    </Provider>
  );
};

export default App;

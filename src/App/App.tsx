import React from 'react';
import { Header } from '@/layout/header/Header';
import { Sidebar } from '@/layout/sidebar/Sidebar';
import { DashboardPage } from '@/pages/dashboard/Dashboard.page';
import { Patients } from '@/pages/patients/Patients';
import { Route, Routes } from 'react-router';
import { Layout } from 'antd';

import styles from './app.module.scss';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout className={styles.container}>
      <Header />
      <Layout>
        <Sidebar />
        <Layout className={styles.wrapper}>
          <Content className={styles.main}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/patients" element={<Patients />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
      {/* <Footer style={{ color: 'var(--color-panel-bg)' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer> */}
    </Layout>
  );
};

export default App;

import { useTheme } from '@/hooks/useTheme.hook';
import { MoonFilled } from '@ant-design/icons';
import { Button, Layout, Typography } from 'antd';

import styles from './header.module.scss';

export const Header = () => {
  const { toggleTheme } = useTheme();

  return (
    <Layout.Header className={styles.header}>
      <Typography.Title>MS-Lily</Typography.Title>
      <Button onClick={toggleTheme} type="text" className={styles.toggle}>
        <MoonFilled />
      </Button>
    </Layout.Header>
  );
};

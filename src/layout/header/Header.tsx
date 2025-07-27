import { useTheme } from '@/hooks/useTheme.hook';
import { selectAuthLoading, selectAuthUser } from '@/store/auth/auth.selectors';
import { logoutUser } from '@/store/auth/auth.slice';
import { AppDispatch } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { LogoutOutlined, MoonFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, MenuProps, message, Space, Typography } from 'antd';

import styles from './header.module.scss';

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();

  const user = useSelector(selectAuthUser);
  const loading = useSelector(selectAuthLoading);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      message.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      message.error('Logout failed');
    }
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => navigate('/profile'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout.Header className={styles.header}>
      <Typography.Title level={3} style={{ margin: 0, color: 'inherit' }}>
        MS-Lily
      </Typography.Title>

      <Space size="middle">
        <Button onClick={toggleTheme} type="text" className={styles.toggle}>
          <MoonFilled />
        </Button>

        {user && (
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
            <Button type="text" loading={loading} style={{ height: 'auto', padding: '4px 8px' }}>
              <Space>
                <Avatar size="small" icon={<UserOutlined />} />
                <span>{user.name}</span>
              </Space>
            </Button>
          </Dropdown>
        )}
      </Space>
    </Layout.Header>
  );
};

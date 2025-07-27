import React, { useEffect } from 'react';
import { LoginRequest } from '@/service/service.types';
import { selectAuthError, selectAuthLoading, selectIsAuthenticated } from '@/store/auth/auth.selectors';
import { clearError, loginUser } from '@/store/auth/auth.slice';
import { AppDispatch } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Form, Input, message, Typography } from 'antd';

import styles from './login.module.scss';

const { Title, Text } = Typography;

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const [form] = Form.useForm();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const from = (location.state as any)?.from?.pathname || '/';

  useEffect(() => {
    // Clear any previous errors when component mounts
    if (error) {
      dispatch(clearError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    // Show error message if login fails
    if (error) {
      message.error(error);
    }
  }, [error]);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const onFinish = async (values: LoginRequest) => {
    try {
      const result = await dispatch(loginUser(values));
      if (loginUser.fulfilled.match(result)) {
        message.success('Login successful!');
        // Navigation will happen automatically due to isAuthenticated change
      }
    } catch (error) {
      // Error handling is done in the slice
      console.error('Login error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <Card className={styles.card}>
          <div className={styles.header}>
            <Title level={2} className={styles.title}>
              Welcome Back
            </Title>
            <Text type="secondary" className={styles.subtitle}>
              Sign in to your account
            </Text>
          </div>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              closable
              style={{ marginBottom: 24 }}
              onClose={() => dispatch(clearError())}
            />
          )}

          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            className={styles.form}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter your email" size="large" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" size="large" />
            </Form.Item>

            <Form.Item className={styles.submitButton}>
              <Button type="primary" htmlType="submit" loading={loading} size="large" block>
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <div className={styles.footer}>
            <Text type="secondary">
              Don't have an account? <a href="/register">Sign up</a>
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

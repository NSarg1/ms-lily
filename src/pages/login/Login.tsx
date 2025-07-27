import React, { useState } from 'react';
import { authApi } from '@/service/auth/auth.api';
import { LoginRequest } from '@/service/service.types';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Typography } from 'antd';

import styles from './login.module.scss';

const { Title, Text } = Typography;

export const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: LoginRequest) => {
    setLoading(true);
    try {
      // Get CSRF token first
      await authApi.getCsrfToken();

      // Attempt login
      const response = await authApi.login(values);

      message.success('Login successful!');
      console.log('Login response:', response.data);

      // Handle successful login (redirect, store token, etc.)
      // You can implement your login logic here
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Login failed');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
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

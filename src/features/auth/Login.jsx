/* eslint-disable react/prop-types */
import {
  Col,
  Form,
  Row,
  Typography,
  theme,
  Button,
  Input,
  Checkbox
} from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyASapdRtPd5Zo5fxAYmK0Z587Zz0wafkgQ",
  authDomain: "mrbit-9e8c9.firebaseapp.com",
  projectId: "mrbit-9e8c9",
  storageBucket: "mrbit-9e8c9.appspot.com",
  messagingSenderId: "931323046056",
  appId: "1:931323046056:web:2a1fd9acfb9bddc3a07a9d",
  measurementId: "G-FMV2L7LX5P"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const columnStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  AlignItems: 'center',
};

function Login() {

  const [loading, setLoading] = useState(false);

  const { token } = theme.useToken();

  const themeStyle = useMemo(() => ({
    backgroundColor: token.colorPrimaryBg,
    padding: token.padding,
    color: token.colorPrimaryText,
    fontSize: token.fontSize,
  }), [
    token.colorPrimaryBg,
    token.colorPrimaryText,
    token.fontSize,
    token.padding
  ]);

  return (
    <Row style={{ height: '100vh', ...themeStyle }}>
      <Col span={8} offset={8} style={columnStyle}>
        <Header />

        <LoginForm token={token} loading={loading} setLoading={setLoading} />
      </Col>
    </Row>
  );
}

function Header() {
  return (
    <Typography.Title level={1} style={{ margin: '0 auto 3rem auto' }}>
      Login to your account
    </Typography.Title>
  );
}

function LoginForm({ token, loading, setLoading }) {
  async function onFinish({ email, password }) {
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(getAuth(), email, password);
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }

  return (
    <Form
      name='login-form'
      onFinish={onFinish}
      size='large'
      disabled={loading}
    >

      <EmailField token={token} />

      <PasswordField token={token} />

      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link to="">Forgot password?</Link>
      </Form.Item>

      <SubmitButton loading={loading} />

      <Form.Item>
        Or <Link to='/register'>Register now!</Link>
      </Form.Item>
    </Form>
  );
}

function EmailField({ token }) {
  return (
    <Form.Item
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input
        type='email'
        prefix={
          <MailOutlined style={{ color: `${token.colorTextDisabled}` }} />
        }
        placeholder="email"
      />
    </Form.Item>
  );
}

function PasswordField({ token }) {
  return (
    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input
        prefix={
          <LockOutlined style={{ color: `${token.colorTextDisabled}` }} />
        }
        type="password"
        placeholder="Password"
      />
    </Form.Item>
  );
}

function SubmitButton({ loading }) {
  return (
    <Form.Item>
      <Button
        block
        loading={loading}
        type="primary"
        htmlType="submit"
      >
        Log in
      </Button>
    </Form.Item>
  );
}

export { Login };

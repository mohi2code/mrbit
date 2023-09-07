/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { Alert, Button, Form, Input, Typography } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { auth } from '../../../services/firebaseConfig';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import FullPage from './layout/FullPage';

function Login() {
  const [signIn, , loading, error] = useSignInWithEmailAndPassword(auth);

  function onFinish({ email, password }) {
    signIn(email, password);
  }

  return (
    <FullPage>
      <section style={formContainerStyle}>
        <Form onFinish={onFinish} layout='vertical' disabled={loading}>
          <Form.Item style={headerStyle}>
            <Typography.Title level={1}>Login</Typography.Title>
          </Form.Item>

          {error && (
            <Form.Item>
              <Alert message={error.code} type='error' showIcon closable />
            </Form.Item>
          )}

          <EmailField />
          <PasswordField />
          <SubmitButton loading={loading} />
        </Form>
      </section>
    </FullPage>
  );
}

function EmailField() {
  return (
    <Form.Item
      name='email'
      label="E-mail"
      rules={[
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
        {
          required: true,
          message: 'Please input your E-mail!',
        },
      ]}>
      <Input />
    </Form.Item>
  );
}

function PasswordField() {
  return (
    <Form.Item
      name="password"
      label="Password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>
  );
}

function SubmitButton({ loading }) {
  return (
    <Form.Item>
      <Button loading={loading} icon={<LoginOutlined />} type="primary" htmlType="submit" block>
        Log in
      </Button>
      Or <Link to='/auth/register'>Create a new account!</Link>
    </Form.Item>
  );
}

const headerStyle = {
  textAlign: 'center',
  // marginBottom: '1rem',
};

const formContainerStyle = {
  height: '100%',
  width: '100%',
  maxWidth: '450px',
  margin: 'auto',
  display: 'grid',
  gridTemplateColumns: '1fr',
  alignItems: 'center',
};

export default Login;

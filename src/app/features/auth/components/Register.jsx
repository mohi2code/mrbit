/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { Alert, Button, Form, Input, Typography } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { auth } from '../../../services/firebaseConfig';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import FullPage from './layout/FullPage';

function Register() {
  const [createUser, , loading, error] = useCreateUserWithEmailAndPassword(auth);

  function onFinish({ email, password }) {
    createUser(email, password);
  }

  return (
    <FullPage>
      <section style={formContainerStyle}>
        <Form onFinish={onFinish} layout='vertical' disabled={loading}>
          <Form.Item style={headerStyle}>
            <Typography.Title level={1}>Create a New Account</Typography.Title>
          </Form.Item>

          {error && (
            <Form.Item>
              <Alert message={error.code} type='error' showIcon closable />
            </Form.Item>
          )}

          <EmailField />
          <PasswordField />
          <PasswordConfirmField />
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

function PasswordConfirmField() {
  return (
    <Form.Item
      name="confirm"
      label="Confirm Password"
      dependencies={['password']}
      hasFeedback
      rules={[
        {
          required: true,
          message: 'Please confirm your password!',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('The new password that you entered do not match!'));
          },
        }),
      ]}
    >
      <Input.Password />
    </Form.Item>
  );
}

function SubmitButton({ loading }) {
  return (
    <Form.Item>
      <Button loading={loading} icon={<UserAddOutlined />} type="primary" htmlType="submit" block>
        Create account
      </Button>
      Already have an account? <Link to='/auth'>login!</Link>
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

export default Register;

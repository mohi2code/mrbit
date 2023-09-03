/* eslint-disable react/prop-types */
import {
  Form, Button,
  Input,
  Checkbox
} from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import useThemeStyle from '../../hooks/useThemeStyle';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export function LoginForm({ loading, setLoading }) {
  const { token } = useThemeStyle();

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
        prefix={<MailOutlined style={{ color: `${token.colorTextDisabled}` }} />}
        placeholder="email" />
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
        prefix={<LockOutlined style={{ color: `${token.colorTextDisabled}` }} />}
        type="password"
        placeholder="Password" />
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

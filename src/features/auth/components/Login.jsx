import { Link, Navigate } from 'react-router-dom';
import { useLoginMutation } from '../../../app/services/firebaseAPI'
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Typography, Alert } from 'antd';
import { useDispatch } from 'react-redux';
import { setUser } from '../auth';

function Login() {
  const dispatch = useDispatch()
  const [login, response] = useLoginMutation()

  function onFinish({ email, password }) {
    login({ email, password })
      .unwrap()
      .then(user => dispatch(setUser(user)))
  }

  if (response.isSuccess)
    return <Navigate to='/' />

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2rem'
      }}
    >
      <Typography.Title level={2}>Login</Typography.Title>
      <Form
        onFinish={onFinish}
        disabled={response.isLoading}
        style={{
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto'
        }}
      >
        {response.isError && (
          <Form.Item>
            <Alert
              message={response.error}
              type="error"
              showIcon
              closable
            />
          </Form.Item>
        )}

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button loading={response.isLoading} block type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>

        <Space>Or <Link to='/auth/register'>Register now!</Link></Space>

      </Form>
    </div>
  )
}

export default Login;

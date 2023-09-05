import { Link, Navigate } from 'react-router-dom';
import { useRegisterMutation } from '../../../app/services/firebaseAPI'
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Typography, Alert } from 'antd';

function Register() {
  const [register, response] = useRegisterMutation()

  const onFinish = ({ email, password }) => register({ email, password });

  if (response.isSuccess)
    return <Navigate to='/auth/login' />

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
      <Typography.Title level={2}>Register a new user</Typography.Title>
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
            Register
          </Button>
        </Form.Item>

        <Space>Or <Link to='/auth/login'>login</Link></Space>

      </Form>
    </div>
  )
}

export default Register;

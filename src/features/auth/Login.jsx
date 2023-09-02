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
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

const columnStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  AlignItems: 'center',
};

function Login() {

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

  const onFinish = values => console.log(values);

  return (
    <Row style={{ height: '100vh', ...themeStyle }}>
      <Col span={8} offset={8} style={columnStyle}>
        <Typography.Title level={1} style={{ margin: '0 auto 3rem auto' }}>
          Login to your account
        </Typography.Title>

        <Form
          name='login-form'
          onFinish={onFinish}
          size='large'
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input type='email' prefix={<MailOutlined style={{ color: `${token.colorTextDisabled}` }} />} placeholder="email" />
          </Form.Item>
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
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link to="">Forgot password?</Link>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>

          <Form.Item>
            Or <Link to='/register'>Register now!</Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export { Login };

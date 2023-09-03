/* eslint-disable react/prop-types */
import {
  Col,
  Row,
  Typography
} from 'antd';
import { useState } from 'react';
import useThemeStyle from '../../hooks/useThemeStyle';
import { LoginForm } from './LoginForm';

const columnStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  AlignItems: 'center',
};

function Login() {
  const [loading, setLoading] = useState(false);

  const { themeStyle } = useThemeStyle();

  return (
    <Row style={{ height: '100vh', ...themeStyle }}>
      <Col span={8} offset={8} style={columnStyle}>
        <Header />

        <LoginForm loading={loading} setLoading={setLoading} />
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

export { Login };

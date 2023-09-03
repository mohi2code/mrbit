/* eslint-disable react/prop-types */
import {
  Col,
  Row,
  Typography
} from 'antd';
import { useState } from 'react';
import useThemeStyle from '../../hooks/useThemeStyle';

import { initializeApp } from "firebase/app";
import { LoginForm } from './LoginForm';

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

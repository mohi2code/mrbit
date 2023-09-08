/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import FullPage from './app/features/auth/components/layout/FullPage';
import { PoweroffOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Typography, theme, Button, Menu } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;


function Dashboard() {
  const { token } = theme.useToken();

  return (
    <FullPage padding>
      <Layout style={{ height: '100%' }}>
        <DashboardHeader token={token} />

        <Layout>
          <DashboardSidebar token={token} />

          <Content style={{ padding: token.padding }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </FullPage>
  );
}

function DashboardHeader({ token }) {
  const navigate = useNavigate();

  const headerStyle = useMemo(() => ({
    backgroundColor: token.colorBgLayout,
    borderBottom: `1px solid ${token.colorBorder}`,
    display: 'flex',
    gap: '1rem',
    padding: token.padding,
    alignItems: 'center'
  }), [token]);

  return (
    <Header style={headerStyle}>
      <Typography.Title style={{ marginBottom: '0' }} level={2}>MrBit</Typography.Title>

      <Button
        style={{ marginLeft: 'auto' }}
        icon={<PoweroffOutlined />}
        onClick={() => navigate('/logout')}
      >
        Logout
      </Button>
    </Header>
  );
}

function DashboardSidebar({ token }) {
  const siderStyle = useMemo(() => ({
    backgroundColor: token.colorBgLayout,
    borderRight: `1px solid ${token.colorBorder}`
  }), [token]);

  const siderMenuStyle = useMemo(() => ({
    backgroundColor: token.colorBgLayout
  }), [token]);

  return (
    <Sider style={siderStyle}>
      <Menu
        style={siderMenuStyle}
        defaultSelectedKeys={['home']}
        items={[
          {
            label: <Link to='/dashboard'>Home</Link>,
            icon: <HomeOutlined />,
            key: 'home',
          },
          {
            label: <Link to='users-list'>Users list</Link>,
            icon: <UserOutlined />,
            key: 'users-list',
          }
        ]}
      />
    </Sider>
  );
}


export default Dashboard;

import { Button, Space, Typography } from 'antd';
import FullPage from './app/features/auth/components/layout/FullPage';
import { ThemeSwitch } from './app/features/dashboard/components/Dashboard';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <FullPage>
      <Space direction='vertical' size='large'>
        <Typography.Title level={1}>Landing page here...</Typography.Title>
        <Button type='primary' size='large' onClick={() => navigate('/dashboard')}>Go to dashboard</Button>
        <Typography.Title level={3}>
          Toggle dark mode: <ThemeSwitch />
        </Typography.Title>
      </Space>
    </FullPage>
  );
}

export default HomePage;
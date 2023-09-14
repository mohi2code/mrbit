/* eslint-disable react/prop-types */
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAccount } from '../authSlice';
import { Result } from 'antd';

function AdminGuard() {
  const account = useSelector(selectAccount);

  return account?.accountType === 'admin' ? <Outlet /> : <NotAuthorizedResult subtitle={`Admin Guard, Access Denied you are a ${account?.accountType}`} />;
}

export default AdminGuard;

export function NotAuthorizedResult({ subtitle }) {
  return <Result
    status="403"
    title="403"
    subTitle={subtitle}
  />;
}
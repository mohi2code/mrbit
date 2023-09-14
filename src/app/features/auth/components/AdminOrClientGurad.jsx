import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAccount } from '../authSlice';
import { NotAuthorizedResult } from './AdminGuard';

function AdminOrClientGuard() {
  const account = useSelector(selectAccount);

  return account?.accountType === 'admin' || account?.accountType === 'client' ? <Outlet /> : <NotAuthorizedResult subtitle={`AdminRrClientGuard, Access Denied you are a ${account?.accountType}`} />;
}

export default AdminOrClientGuard;
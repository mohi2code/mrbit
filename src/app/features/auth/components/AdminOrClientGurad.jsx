import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAccount } from '../authSlice';

function AdminOrClientGuard() {
  const account = useSelector(selectAccount);

  return account?.accountType === 'admin' || account?.accountType === 'client' ? <Outlet /> : <h1>AdminRrClientGuard, Access Denied you are a {account?.accountType}</h1>;
}

export default AdminOrClientGuard;
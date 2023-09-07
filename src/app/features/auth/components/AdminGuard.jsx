import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAccount } from '../authSlice';

function AdminGuard() {
  const account = useSelector(selectAccount);

  return account.accountType === 'admin' ? <Outlet /> : <h1>Admin Guard, Access Denied you are a {account.accountType}</h1>;
}

export default AdminGuard;
import { useSelector } from 'react-redux';
import { selectCreds } from '../authSlice';
import { Navigate, Outlet } from 'react-router-dom';

function AuthGuard() {
  const credentials = useSelector(selectCreds);

  return credentials ? <Outlet /> : <Navigate to='/auth' replace={true} />;
}

export default AuthGuard;

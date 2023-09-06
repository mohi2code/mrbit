import { useDispatch, useSelector } from 'react-redux';
import { selectCreds, setCredentials } from '../authSlice';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../services/firebaseConfig';

function AuthIndex() {
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(auth);
  const credentials = useSelector(selectCreds);

  if (error)
    return <h1>An Unexpected Error Occured, Check the console.</h1>;

  if (credentials)
    return <Navigate to='/dashboard' replace />;
  else {
    if (user)
      dispatch(setCredentials({
        email: user.email,
        displayName: user.displayName,
      }));
  }

  return loading ? <h1>Processing request...</h1> : <Outlet />;
}

export default AuthIndex;

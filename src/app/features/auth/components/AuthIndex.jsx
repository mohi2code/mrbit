import { useDispatch, useSelector } from 'react-redux';
import { selectCreds, setCredentials } from '../authSlice';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../services/firebaseConfig';
import { useEffect } from 'react';

function AuthIndex() {
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(auth);
  const credentials = useSelector(selectCreds);

  const navigate = useNavigate();

  useEffect(() => {
    if (error)
      console.log('An Unexpected Error Occured, Check the console.');

    if (credentials)
      navigate('/dashboard', { replace: true });
    else {
      if (user)
        dispatch(setCredentials({
          email: user.email,
          displayName: user.displayName,
        }));
    }
  }, [user, credentials, error, dispatch, navigate]);

  return loading ? <h1>AuthIndex, Processing request...</h1> : <Outlet />;
}

export default AuthIndex;

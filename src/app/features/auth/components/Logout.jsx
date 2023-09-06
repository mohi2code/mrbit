import { auth } from '../../../services/firebaseConfig';
import { useSignOut } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useSignOut(auth);

  useEffect(() => {
    logout().then(success => {
      console.log(`Logging out is ${success}`);
      dispatch(setCredentials({}));
      navigate('/');
    });
  }, []);

  return <h1>Loggin out</h1>;
}

export default Logout;
import { Button } from 'antd';
import { auth } from '../../../services/firebaseConfig';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

function Login() {
  const [signIn] = useSignInWithEmailAndPassword(auth);

  return (
    <>
      <h1>Login</h1>
      <Button onClick={() => signIn('mohi@test.com', 'mohi0000')}>Login</Button>
    </>
  );
}

export default Login;

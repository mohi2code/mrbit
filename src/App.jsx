import { Outlet, Route, Routes } from 'react-router-dom';
import AuthIndex from './app/features/auth/components/AuthIndex';
import AuthGuard from './app/features/auth/components/AuthGurad';
import HydrateAccount from './app/features/auth/components/HydrateAccount';
import Login from './app/features/auth/components/Login';
import Logout from './app/features/auth/components/Logout';

function App() {
  return (
    <Routes>
      <Route path='/*' >
        <Route index element={<h2>Home</h2>} />

        {/* Public routes */}
        <Route path='auth' element={<AuthIndex />} >
          <Route index element={<Login />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        <Route path='logout' element={<Logout />} />

        {/* Authentication required pathes */}
        <Route element={<AuthGuard />} >
          <Route element={<HydrateAccount />}>
            <Route path='dashboard/*' element={<Dashboard />} >
              <Route index element={<h2>Dashboard home</h2>} />

              {/* Admin only routes */}
              <Route element={<AdminGuard />}>
                <Route path='users-list' element={<UsersList />} />
              </Route>

              {/* Not found dashboard */}
              <Route path='*' element={<h1>Not found 😕</h1>} />
            </Route>
          </Route>
        </Route>

        {/* Not Found  */}
        <Route path='*' element={<h1>Not found 😕</h1>} />
      </Route>
    </Routes>
  );
}

function AdminGuard() {
  return <Outlet />;
}

function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <Outlet />
    </>
  );
}

function UsersList() {
  return <h3>UsersList</h3>;
}

function Register() {
  return <h1>Register</h1>;
}

export default App;

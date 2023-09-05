import { Outlet, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/*' >
        <Route index element={<h2>Home</h2>} />

        {/* Public routes */}
        <Route path='auth' element={<AuthIndexComponent />} >
          <Route index element={<Login />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        {/* Authentication required pathes */}
        <Route element={<RequireAuth />} >
          <Route path='dashboard/*' element={<Dashboard />} >
            <Route index element={<h2>Dashboard home</h2>} />

            {/* Admin only routes */}
            <Route element={<AdminOnly />}>
              <Route path='users-list' element={<UsersList />} />
            </Route>

            {/* Not found dashboard */}
            <Route path='*' element={<h1>Not found 😕</h1>} />
          </Route>
        </Route>

        {/* Not Found  */}
        <Route path='*' element={<h1>Not found 😕</h1>} />
      </Route>
    </Routes>
  );
}

function AuthIndexComponent() {
  return (
    <>
      <h2>Auth Index Component</h2>
      <Outlet />
    </>
  );
}

function RequireAuth() {
  return <Outlet />;
}

function AdminOnly() {
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

function Login() {
  return <h1>Login</h1>;
}

function Register() {
  return <h1>Register</h1>;
}

export default App;

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/*'>
        <Route index element={<Dashboard />} />
        <Route path='dashboard' element={<Dashboard />} />

        <Route path='auth/*'>
          <Route index element={<Login />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        {/* Not Found page */}
        <Route path='*' element={<h1>Page not Found!</h1>} />
      </Route>
    </Routes>
  );
}

function Dashboard() {
  return <h1>Dashboard</h1>;
}

function Login() {
  return <h1>Login</h1>;
}

function Register() {
  return <h1>Register</h1>;
}

export default App

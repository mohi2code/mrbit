import { Route, Routes } from 'react-router-dom';
import Login from './features/auth/components/Login';
import Register from './features/auth/components/Register';
import Dashboard from './Dashboard';
import UsersList from './UsersList'

function App() {
  return (
    <Routes>
      <Route path='/*'>
        <Route index element={<Dashboard />} />
        <Route path='dashboard/*' element={<Dashboard />}>
          <Route index element={<UsersList />} />
          <Route path='users' element={<UsersList />} />
        </Route>

        <Route path='auth'>
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

export default App

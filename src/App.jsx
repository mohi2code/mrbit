import { Outlet, Route, Routes } from 'react-router-dom';
import { Login } from './features/auth';

function App() {
  return (
    <Routes>
      <Route path='/*' element={<Outlet />}>
        <Route index element={<Login />} />
        <Route path='login' element={<Login />} />
        {/* Route to render if not match happended, like a 404 */}
        <Route path='*' element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;

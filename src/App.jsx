import { useSelector } from 'react-redux';
import { selectTheme, themesEnum } from './app/features/dashboard/dashboardSlice';
import { ConfigProvider, theme } from 'antd';
import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import AuthIndex from './app/features/auth/components/AuthIndex';
import AuthGuard from './app/features/auth/components/AuthGurad';
import AdminGuard from './app/features/auth/components/AdminGuard';
import AdminOrClientGuard from './app/features/auth/components/AdminOrClientGurad';
import HydrateAccount from './app/features/auth/components/HydrateAccount';
import Login from './app/features/auth/components/Login';
import Register from './app/features/auth/components/Register';
import Logout from './app/features/auth/components/Logout';
import Dashboard from './app/features/dashboard/components/Dashboard';
import UsersList from './app/features/dashboard/components/UsersList';
import NewProposalDetails from './app/features/proposal/components/NewProposalDetails';
import NewProposalTranslator from './app/features/proposal/components/NewProposalTranslator';
import InvitationsList from './app/features/proposal/components/InvitationsList';
import ProposalsList from './app/features/proposal/components/ProposalsList';
import DashboardHome from './app/features/dashboard/components/DashboardHome';

function App() {
  return (
    <Routes>
      <Route path='/*' >
        <Route index element={<HomePage />} />

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

              {/* Admin only routes */}
              <Route element={<AdminGuard />}>
                <Route index element={<DashboardHome />} />
                <Route path='users-list' element={<UsersList />} />
              </Route>

              <Route path='invitations'>
                <Route index element={<InvitationsList />} />
              </Route>

              <Route path='proposals' element={<AdminOrClientGuard />}>
                <Route index element={<ProposalsList />} />
                <Route path='proposals-list' element={<ProposalsList />} />
                <Route path='new'>
                  <Route path='proposal-details' element={<NewProposalDetails />} />
                  <Route path='proposal-translator/:id' element={<NewProposalTranslator />} />
                </Route>
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

export function ThemedApp() {
  const appTheme = useSelector(selectTheme);

  return (
    <ConfigProvider
      theme={{
        algorithm: appTheme === themesEnum.dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <App />
    </ConfigProvider>
  );
}

export default App;

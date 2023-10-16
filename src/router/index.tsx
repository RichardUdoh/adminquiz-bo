import { lazy, Suspense } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import GuestGuard from '../guards/GuestGuard';

import AuthGuard from '../guards/AuthGuard';
import LoadingScreen from '../design/loader/LoadingScreen';

const Loadable = (Component: React.ElementType) => (props: any) => {
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');
  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            position: 'fixed',
            ...(!isDashboard && {
              top: 0,
              left: 0,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // AUTH ROUTES
    {
      path: '/',
      element: (
        <GuestGuard>
          <LoginLayout />
        </GuestGuard>
      ),
      children: [
        { path: '', element: <Navigate to={`/auth`} replace /> },
        { path: '/auth', element: <Login /> },
        { path: 'reset-password', element: <>reset password</> }
      ]
    },
    // DASHBOARD ROUTES
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: '', element: <Navigate to={`/dashboard/app`} replace /> },
        { path: 'app', element: <DashboarPage /> },
        { path: 'quiz', element: <QuizzPage /> },
        { path: 'message', element: <MessagePage /> },
        { path: 'sponsors', element: <SponsorsPage /> },
        { path: 'publicites', element: <PublishPage /> },
        { path: 'role-permissions', element: <RolePermissionPage /> },
        { path: 'user', element: <UserPage /> }
      ]
    },
    // OTHERS ROUTES
    {
      path: '*',
      children: [
        { path: 'maintenance', element: <>maintenance</> },
        { path: '500', element: <>500</> },
        { path: '404', element: <>404</> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// AUTH
const LoginLayout = Loadable(lazy(() => import(`../layouts/auth/LoginLayout`)));
const Login = Loadable(lazy(() => import(`../pages/auth/Login`)));

// DASHBOARD
const DashboardLayout = Loadable(lazy(() => import(`../layouts/dashboard/DashboardLayout`)));
const DashboarPage = Loadable(lazy(() => import(`../pages/dashboard/DashboarPage`)));
const QuizzPage = Loadable(lazy(() => import(`../pages/dashboard/QuizzPage`)));
const MessagePage = Loadable(lazy(() => import(`../pages/dashboard/MessagePage`)));
const SponsorsPage = Loadable(lazy(() => import(`../pages/dashboard/SponsorsPage`)));
const PublishPage = Loadable(lazy(() => import(`../pages/dashboard/PublishPage`)));
const RolePermissionPage = Loadable(lazy(() => import(`../pages/dashboard/RolePermissionPage`)));
const UserPage = Loadable(lazy(() => import(`../pages/dashboard/UserPage`)));

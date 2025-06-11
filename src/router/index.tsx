import { lazy, Suspense } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import GuestGuard from '../guards/GuestGuard';

import AuthGuard from '../guards/AuthGuard';
import LoadingScreen from '../design/loader/LoadingScreen';
import RolePermissionsPage from '../pages/dashboard/role_permissions/RolePermissionsPage';
import CreateNewEditRolePermissionPage from '../pages/dashboard/role_permissions/CreateNewEditRolePermissionPage';
import UsersPage from '../pages/dashboard/users/UsersPage';
import CreateNewEditUserPage from '../pages/dashboard/users/CreateNewEditUserPage';
import UsagersPage from '../pages/dashboard/usagers/UsagersPage';
import QuizzesGratuitPage from '../pages/dashboard/quiz/QuizzesGratuitPage';
import QuizzesPayantPage from '../pages/dashboard/quiz/QuizzesPayantPage';

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
        {
          path: 'quiz',
          children: [
            { path: '', element: <QuizzPage />, index: true },
            { path: 'gratuit', element: <QuizzesGratuitPage /> },
            { path: 'payant', element: <QuizzesPayantPage /> }
          ]
        },



        //Messages
        { path: 'messages', element: <MessagesPage /> },
        { path: 'messages/create', element: <CreateNewEditMessagesPage /> },
        { path: 'messages/:id/edit', element: <CreateNewEditMessagesPage /> },

        //Sponsor
        { path: 'sponsors', element: <SponsorsPage /> },
        { path: 'sponsors/create', element: <CreateNewEditSponsorPage /> },
        { path: 'sponsors/:id/edit', element: <CreateNewEditSponsorPage /> },
        
        //Publicites
        { path: 'publicites', element: <PublicitesPage /> },
        { path: 'publicites/create', element: <CreateNewEditPublicitePage /> },
        { path: 'publicites/:id/edit', element: <CreateNewEditPublicitePage /> },

        //RolePermission
        { path: 'role-permissions', element: <RolePermissionsPage /> },
        { path: 'role-permissions/create', element: <CreateNewEditRolePermissionPage /> },
        { path: 'role-permissions/:id/edit', element: <CreateNewEditRolePermissionPage /> },

        //Usagers
        { path: 'usagers', element: <UsagersPage /> },

        //User
        { path: 'users', element: <UsersPage /> },
        { path: 'users/create', element: <CreateNewEditUserPage /> },
        { path: 'users/:id/edit', element: <CreateNewEditUserPage /> },
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
const QuizzPage = Loadable(lazy(() => import(`../pages/dashboard/quiz/QuizzPage`)));
const GratuitPage = Loadable(lazy(() => import(`../pages/dashboard/quiz/Gratuit`)));
const SponsorsPage = Loadable(lazy(() => import(`../pages/dashboard/sponsors/SponsorsPage`)));
const MessagesPage = Loadable(lazy(() => import(`../pages/dashboard/messages/MessagesPage`)));
const PublicitesPage = Loadable(lazy(() => import(`../pages/dashboard/publicites/PublicitesPage`)));
const CreateNewEditMessagesPage = Loadable(
  lazy(() => import(`../pages/dashboard/messages/CreateNewEditMessagesPage`))
);
const CreateNewEditPublicitePage = Loadable(
  lazy(() => import(`../pages/dashboard/publicites/CreateNewEditPublicitesPage`))
);
const CreateNewEditSponsorPage = Loadable(
  lazy(() => import(`../pages/dashboard/sponsors/CreateNewEditSponsorPage`))
);
const RolePermissionPage = Loadable(lazy(() => import(`../pages/dashboard/RolePermissionPage`)));
const UserPage = Loadable(lazy(() => import(`../pages/dashboard/UserPage`)));

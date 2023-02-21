import {Suspense, lazy, useEffect} from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/DashboardLayout';
import SplashLayout from '../layouts/SplashLayout';
import AuthGuard from './AuthGuard';
import GuestGuard from './GuestGuard';

import LoadingScreen from './LoadingScreen';
import mixpanel from "mixpanel-browser";
import RoleGuard from "./RoleGuard";
// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';

export function useTitle(title) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = "MUIStrap - " + title
    return () => {
      document.title = prevTitle
    }
  })
}


// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

const Loadable = (Component) => (props) => {

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};


export default function Router() {
  const location = useLocation();

  return useRoutes([
    {
      path: '/',
      element: <AuthGuard><DashboardLayout /></AuthGuard>,
      children: [
        { element: <Navigate to="/dashboard/home" replace />, index: true },
        { path: '/dashboard', element: <Navigate to="/dashboard/home" replace /> },
        { path: '/dashboard/home', element: <PageDefault /> },       
        //role guard example { path: '/dashboard/settings', element: <RoleGuard accessLevel={2}><PageSettings /></RoleGuard> },
        // { path: '/empty-state', element: <PageEmptyState /> },

      ],
    },
    {
      path: 'auth',
      element: <SplashLayout />,
      children: [
        { path: 'login', element: <GuestGuard><PageLogin /></GuestGuard> },
      ],
    },
    {
      path: 'auth',
      element: <SplashLayout />,
      children: [
        { path: 'createaccount', element: <GuestGuard><PageCreateAccount /></GuestGuard> },
      ],
    },

    {
      path: '*',
      element: <SplashLayout />,
      children: [
        { path: '404', element: <Page404 /> },

        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}


// Dashboard
const PageDefault = Loadable(lazy(() => import('../pages/PageDefault')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
const PageEmptyState = Loadable(lazy(() => import('../pages/PageEmptyState')));


const PageLogin = Loadable(lazy(() => import('../pages/PageLogin')));
const PageCreateAccount = Loadable(lazy(() => import('../pages/PageCreateAccount')));

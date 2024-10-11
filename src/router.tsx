import { lazy } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';
import { RootErrorBoundary } from '@/pages/common/components/RootErrorHandler';
import { RootSuspense } from '@/pages/common/components/RootSuspense';
import { ErrorPage } from '@/pages/error/components/ErrorPage';
import { NotFoundPage } from '@/pages/error/components/NotFoundPage';
import { Home } from '@/pages/home';

const Cart = lazy(() =>
  import('@/pages/cart').then((module) => ({ default: module.Cart }))
);
const LoginPage = lazy(() =>
  import('@/pages/login').then((module) => ({ default: module.LoginPage }))
);
const Purchase = lazy(() =>
  import('@/pages/purchase').then((module) => ({ default: module.Purchase }))
);
const RegisterPage = lazy(() =>
  import('@/pages/register').then((module) => ({
    default: module.RegisterPage,
  }))
);

const CommonLayout = () => (
  <RootErrorBoundary>
    <RootSuspense>
      <Outlet />
    </RootSuspense>
  </RootErrorBoundary>
);

const router = createBrowserRouter([
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.main, element: <Home />, errorElement: <ErrorPage /> },
      {
        path: pageRoutes.register,
        element: <RegisterPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.login,
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.cart,
        element: <Cart />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.purchase,
        element: <Purchase />,
        errorElement: <ErrorPage />,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;

import { createHashRouter, Navigate } from 'react-router-dom';

import OrderLayout from '@/layout/front/OrderLayout';
import LandingPage from '@/pages/front/LandingPage';
import CheckoutPage from '@/pages/front/CheckoutPage';
import CheckoutResultPage from '@/pages/front/CheckoutResultPage';
import AdminLayout from '@/layout/admin/AdminLayout';
import OrderPage from '@/pages/admin/OrderPage';
import IngredientsPage from '@/pages/admin/IngredientsPage';
import FixedPokesPage from '@/pages/admin/FixedPokesPage';
import OtherProductsPage from '@/pages/admin/OtherProductsPage';
import LoginPage from '@/pages/admin/LoginPages';

const routes = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/order',
    element: <OrderLayout />,
  },
  {
    path: '/checkout',
    children: [
      {
        index: true,
        element: <CheckoutPage />,
      },
      {
        path: 'result',
        element: <CheckoutResultPage />,
      },
    ],
  },
  {
    path: `/admin/login`,
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <OrderPage />, // 可以換成dashboard
      },
      {
        path: 'product',
        element: <Navigate to="ingredients" replace />,
        children: [
          {
            path: 'ingredients',
            element: <IngredientsPage />,
          },
          {
            path: 'fixedPokes',
            element: <FixedPokesPage />,
          },
          {
            path: 'otherProducts',
            element: <OtherProductsPage />,
          },
        ],
      },
    ],
  },
];

const router = createHashRouter(routes);

export default router;

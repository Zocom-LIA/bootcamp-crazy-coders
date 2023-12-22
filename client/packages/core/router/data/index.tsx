import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LandingPage } from '@zocom/landing-page';
import { ReceiptPage } from '@zocom/receipt-page';
import { OrdersPage } from '@zocom/orders-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/receipt',
    element: <ReceiptPage />,
  },
  {
    path: '/orders',
    element: <OrdersPage />,
  },
  {
    path: '*',
    element: <p>Page Not Found</p>,
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

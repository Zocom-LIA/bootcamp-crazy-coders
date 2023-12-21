import { createBrowserRouter, RouterProvider } from 'react-router-dom';
<<<<<<< HEAD
import { AppLayout } from '@zocom/applayout';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [{ path: '/', element: <p>Hej</p> }],
=======
import { LandingPage } from '@zocom/landing-page';
import { ReceiptPage } from '@zocom/receipt-page';
import { CheckoutPage } from '@zocom/checkout-page';
import { OrderPage } from '@zocom/order-page';
import { AdminPage } from '@zocom/admin-page';

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
    path: '/checkout',
    element: <CheckoutPage />,
  },
  {
    path: '/order',
    element: <OrderPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
>>>>>>> dev
  },
  {
    path: '*',
    element: <p>Page Not Found</p>,
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

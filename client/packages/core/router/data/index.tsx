import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LandingPage } from '@zocom/landing-page';
import { ReceiptPage } from '@zocom/receipt-page';
import { CheckoutPage } from '@zocom/checkout-page';
import { OrdersPage } from '@zocom/orders-page';
import { AdminPage } from '@zocom/admin-page';
import { AppLayout } from '@zocom/applayout';
import { ProtectedRoute } from '@zocom/protected-route';
import { CustomerOrderPage } from '@zocom/customerOrder-page';
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/receipt/:orderId',
        element: <ReceiptPage />,
      },
      {
        path: '/checkout',
        element: <CheckoutPage />,
      },
      {
        path: '/order/:orderId',
        element: <CustomerOrderPage />,
      },
      {
        path: '*',
        element: <p>Page Not Found</p>,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/orders',
        element: <OrdersPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
  {
    path: '*',
    element: <p>Page Not Found</p>,
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

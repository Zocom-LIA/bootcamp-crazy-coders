import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from '@zocom/applayout';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [{ path: '/', element: <p>Hej</p> }],
  },
  {
    path: '*',
    element: <p>Page Not Found</p>,
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

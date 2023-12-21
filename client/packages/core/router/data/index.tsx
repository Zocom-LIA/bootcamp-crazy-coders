import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { LandingPage } from '@zocom/landing-page';
import { Button } from '@zocom/button';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Button type="primary" onClick={() => console.log('first')}>
        Beställ mer
      </Button>
    ),
  },
  {
    path: '*',
    element: <p>Page Not Found</p>,
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

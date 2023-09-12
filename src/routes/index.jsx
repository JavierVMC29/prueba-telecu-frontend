import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAuth } from '../providers/authProvider';
import { ProtectedRoute } from './ProtectedRoute';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import MainLayout from '../layout/MainLayout';
import Visitas from '../pages/visitas/Visitas';
import Visitantes from '../pages/visitas/Visitas';
import PageNotFound from '../pages/PageNotFound';

const Routes = () => {
  const { token } = useAuth();

  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <ProtectedRoute />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: '',
          element: <MainLayout />,
          children: [
            {
              path: '/',
              element: <Visitas />
            },
            {
              path: '/',
              element: <Visitantes />
            }
          ]
        },
        {
          path: '/logout',
          element: <Logout />
        }
      ]
    }
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: '/',
      element: <Login />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: '/login',
          element: <Login />
        }
      ]
    }
  ];

  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;

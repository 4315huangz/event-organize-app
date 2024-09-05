import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import * as Pages from './pages';
import {action as registerAction} from './pages/Register';
import {action as loginAction} from './pages/Login';
import {loader as dashboardLoader} from './pages/DashboardLayout';

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path:'/',
    element:<Pages.HomeLayout />,
    errorElement: <Pages.Error />,  
    children: [
      {
        index: true,
        element: <Pages.Landing />
      },
      {
        path:'login',
        element:<Pages.Login />,
        action: loginAction
      },
      {
        path:'register',
        element:<Pages.Register />,
        action: registerAction
      },
      {
        path: 'dashboard',
        element: <Pages.DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element:<Pages.AddEvent />
          },
          {
            path: 'all-events',
            element: <Pages.AllEvents />
          },
          {
            path: 'profile',
            element: <Pages.Profile />
          },
          {
            path: 'stats',
            element: <Pages.Stats />
          },
          {
            path:'admin',
            element:<Pages.Admin />
          }
        ]
      }
    ]
  }
])
const App = () => {
  return <RouterProvider router={router} />;
}

export default App;
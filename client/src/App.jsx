import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import * as Pages from './pages';
import {action as registerAction} from './pages/Register';
import {action as loginAction} from './pages/Login';
import { action as addEventAction } from './pages/AddEvent';
import { action as editEventAction } from './pages/EditEvent';
import { action as deleteEventAction} from './pages/DeleteEvent';
import { action as profileAction} from './pages/Profile';
import { loader as allEventsLoader} from './pages/AllEvents';
import { loader as editEventLoader} from './pages/EditEvent';
import { loader as dashboardLoader} from './pages/DashboardLayout';
import { loader as adminLoader} from './pages/Admin';



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
            element:<Pages.AddEvent />,
            action: addEventAction
          },
          {

            path: 'all-events',
            element: <Pages.AllEvents />,
            loader: allEventsLoader
          },
          {
            path: 'profile',
            element: <Pages.Profile />,
            action: profileAction
          },
          {
            path: 'stats',
            element: <Pages.Stats />
          },
          {
            path:'admin',
            element:<Pages.Admin />,
            loader:adminLoader
          },
          {
            path:'edit-event/:id',
            element:<Pages.EditEvent/>,
            action: editEventAction,
            loader: editEventLoader
          },
          {
            path:'delete-event/:id',
            action:deleteEventAction
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
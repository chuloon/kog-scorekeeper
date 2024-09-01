import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { TabSelector } from './components/TabSelector/TabSelector';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/:tabValue',
    element: <TabSelector />
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}

import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './components/AppLayout/index.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import { ScrollLayout } from './ScrollLayout.tsx'
import HeartAuth from './pages/projects/HeartAuth.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <ScrollLayout />,
      },
      {
        path: 'team',
        element: <ScrollLayout />,
      },
      {
        path: 'recruitment',
        element: <ScrollLayout />,
      },
      {
        path: 'contact',
        element: <ScrollLayout />,
      },
      {
        path: 'projects/heartauth',
        element: <HeartAuth />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

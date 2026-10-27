import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppLayout from './components/AppLayout/index.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import { ScrollLayout } from './ScrollLayout.tsx'
import HeartAuth from '@/pages/projects/HeartAuth.tsx'
import ResqVoice from '@/pages/projects/ResqVoice.tsx'
import Psychotherapy from '@/pages/projects/Psychotherapy.tsx'
import ProjectsPage from './pages/ProjectsPage.tsx'
import BlogPage from '@/pages/BlogPage.tsx'
import BlogPostPage from '@/pages/BlogPostPage.tsx'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <ScrollLayout />,
        },
        {
          path: '/about',
          element: <ScrollLayout />,
        },
        {
          path: '/team',
          element: <ScrollLayout />,
        },
        {
          path: '/recruitment',
          element: <ScrollLayout />,
        },
        {
          path: '/contact',
          element: <ScrollLayout />,
        },
        {
          path: '/blog',
          element: <BlogPage />,
        },
        {
          path: '/blog/:postId',
          element: <BlogPostPage />,
        },
        {
          path: '/projects',
          element: <ProjectsPage />,
        },
        {
          path: '/projects/heartauth',
          element: <HeartAuth />,
        },
        {
          path: '/projects/resqvoice',
          element: <ResqVoice />,
        },
        {
          path: '/projects/psychotherapy',
          element: <Psychotherapy />,
        },
        {
          path: '/postcreator',
          lazy: async () => ({ Component: (await import('@/pages/PostCreatorPage.tsx')).default }),
        },
        {
          path: '/notfound',
          element: <NotFoundPage />,
        },
        {
          path: '*',
          element: <Navigate to="/notfound" replace />,
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
)

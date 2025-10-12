import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './components/AppLayout/index.tsx'
import ContactPage from './pages/ContactPage.tsx'
import LandingPage from './pages/LandingPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import ProjectsPage from './pages/ProjectsPage.tsx'
import RecruitmentPage from './pages/RecruitmentPage.tsx'
import TeamPage from './pages/TeamPage.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'zespol',
        element: <TeamPage />,
      },
      {
        path: 'projekty',
        element: <ProjectsPage />,
      },
      {
        path: 'rekrutacja',
        element: <RecruitmentPage />,
      },
      {
        path: 'kontakt',
        element: <ContactPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

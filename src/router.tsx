import type { ReactElement } from 'react'

import ContactPage from './pages/ContactPage.tsx'
import LandingPage from './pages/LandingPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import ProjectsPage from './pages/ProjectsPage.tsx'
import RecruitmentPage from './pages/RecruitmentPage.tsx'
import TeamPage from './pages/TeamPage.tsx'

type AppRoute = {
  path: string
  element: ReactElement
  labelKey?: string
  end?: boolean
  includeInNav?: boolean
}

export const appRoutes: AppRoute[] = [
  {
    path: '/',
    element: <LandingPage />,
    labelKey: 'navigation.home',
    includeInNav: true,
    end: true,
  },
  {
    path: '/zespol',
    element: <TeamPage />,
    labelKey: 'navigation.team',
    includeInNav: true,
  },
  {
    path: '/projekty',
    element: <ProjectsPage />,
    labelKey: 'navigation.projects',
    includeInNav: true,
  },
  {
    path: '/rekrutacja',
    element: <RecruitmentPage />,
    labelKey: 'navigation.recruitment',
    includeInNav: true,
  },
  {
    path: '/kontakt',
    element: <ContactPage />,
    labelKey: 'navigation.contact',
    includeInNav: true,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]

type NavigationRoute = AppRoute & { labelKey: string }

export const navigationRoutes: NavigationRoute[] = appRoutes.filter(
  (route): route is NavigationRoute => Boolean(route.includeInNav && route.labelKey),
)

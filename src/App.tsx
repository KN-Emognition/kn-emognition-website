import { RouterProvider } from 'react-router-dom'
import { Suspense } from 'react'
import { router } from './router.tsx'

const App = () => {
  return (
    <Suspense fallback={null}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App

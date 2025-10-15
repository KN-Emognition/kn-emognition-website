import { RouterProvider } from 'react-router-dom'
import { Suspense } from 'react'
import 'primereact/resources/themes/lara-light-indigo/theme.css' //theme
import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css' //icons
import 'primeflex/primeflex.css'
import 'primeflex/themes/primeone-light.css'
import { router } from './router.tsx' // flex

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App

import { Suspense } from 'react'
import AppLayout from './components/AppLayout'

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <AppLayout />
  </Suspense>
)

export default App

import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
import { useNavbarHeight } from '../../hooks/useNavbarHeight.ts'

const AppLayout = () => {
  useNavbarHeight('#site-navbar')

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default AppLayout

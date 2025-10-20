import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
import { useNavbarHeight } from '@/hooks/useNavbarHeight.ts'

const AppLayout = () => {
  useNavbarHeight('#site-navbar')

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="emognition-gradient flex flex-column align-items-center align-content-center w-full">
        <Outlet />
      </main>
    </>
  )
}

export default AppLayout

import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'

function AuthLayout() {
  return (
    <>
      <Navbar />

      <main className="min-h-[70vh] bg-base-200">
        <Outlet />
      </main>

      <Footer />
    </>
  )
}

export default AuthLayout

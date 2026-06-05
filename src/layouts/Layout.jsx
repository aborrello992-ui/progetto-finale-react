import { Outlet, useLoaderData } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'

function Layout() {
  const genres = useLoaderData()

  return (
    <>
      <Navbar />

      <div className="mx-auto grid w-11/12 max-w-6xl gap-6 py-6 lg:grid-cols-[220px_1fr] lg:py-8">
        <Sidebar genres={genres} />

        <Outlet />
      </div>

      <Footer />
    </>
  )
}

export default Layout

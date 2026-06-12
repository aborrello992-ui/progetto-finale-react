import { Outlet, useLoaderData } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'

function Layout() {
  const genres = useLoaderData()

  return (
    <div className="min-h-screen bg-[#0d1110] text-emerald-50">
      <Navbar />

      <div className="mx-auto grid w-11/12 max-w-[1500px] min-w-0 gap-6 py-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:py-8">
        <Sidebar genres={genres} />

        <main className="min-w-0">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default Layout

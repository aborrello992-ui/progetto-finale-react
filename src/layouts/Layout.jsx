import { Outlet , useLoaderData} from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Sidebar from '../components/Sidebar.jsx'

function Layout() {
   const genres = useLoaderData()
return (
  <>
    <Navbar />

    <div className="mx-auto grid w-11/12 max-w-6xl gap-6 py-8 lg:grid-cols-[220px_1fr]">
      <Sidebar genres={genres} />

      <Outlet />
    </div>

    <Footer />
  </>
)
}

export default Layout
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import routes from '../router/routes.js'
import { useUserContext } from '../context/UserContext.jsx'
import supabase from '../database/supabase.js'

function Navbar() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const { user, setUser, setProfile } = useUserContext()

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  function handleSearch(event) {
    event.preventDefault()

    if (search.trim() === '') {
      return
    }

    navigate(`/search/${search.trim()}`)
    setSearch('')
  }

  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="mx-auto flex w-11/12 max-w-6xl flex-col gap-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        <Link className="text-2xl font-bold text-primary" to={routes.home}>
          Rehacktor
        </Link>

        <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
          {user ? (
            <>
              <Link className="btn btn-ghost btn-sm sm:btn-md" to={routes.profile}>
                Profilo
              </Link>
              <Link className="btn btn-ghost btn-sm sm:btn-md" to={routes.favorites}>
                Preferiti
              </Link>

              <button className="btn btn-error btn-sm sm:btn-md" type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-ghost btn-sm sm:btn-md" to={routes.login}>
                Login
              </Link>

              <Link className="btn btn-primary btn-sm sm:btn-md" to={routes.register}>
                Registrati
              </Link>
            </>
          )}
        </div>

        <form className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto" onSubmit={handleSearch}>
          <input
            className="input input-bordered w-full sm:w-80"
            type="text"
            placeholder="Cerca un gioco"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <button className="btn btn-primary" type="submit">
            Cerca
          </button>
        </form>
      </div>
    </nav>
  )
}

export default Navbar

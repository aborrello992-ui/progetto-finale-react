import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import routes from '../router/routes.js'

function Navbar() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

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
      <div className="mx-auto flex w-11/12 max-w-6xl items-center justify-between gap-4">
        <Link className="text-2xl font-bold text-primary" to={routes.home}>
          Rehacktor
        </Link>
        <div className="flex gap-3">
  <Link className="btn btn-ghost" to={routes.login}>
    Login
  </Link>

  <Link className="btn btn-primary" to={routes.register}>
    Registrati
  </Link>
</div>

       <form className="flex gap-2" onSubmit={handleSearch}>
  <input
    className="input input-bordered w-64"
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
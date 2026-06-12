import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import routes from '../router/routes.js'
import { useUserContext } from '../context/UserContext.jsx'
import supabase from '../database/supabase.js'

function Navbar() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const { user, profile, setUser, setProfile } = useUserContext()

  const avatarUrl = profile?.avatar_url
    ? supabase.storage.from('avatar').getPublicUrl(profile.avatar_url).data.publicUrl
    : ''
  const profileName = profile?.username || profile?.first_name || user?.email || 'Profilo'

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
    <nav className="sticky top-0 z-40 border-b border-emerald-500/10 bg-[#0d1110]/95 shadow-xl shadow-black/20 backdrop-blur">
      <div className="mx-auto flex w-11/12 max-w-[1500px] flex-col gap-4 py-4 xl:flex-row xl:items-center">
        <Link className="shrink-0 text-2xl font-black tracking-tight text-emerald-400" to={routes.home}>
          Rehacktor
        </Link>

        <form className="flex w-full flex-col gap-2 sm:flex-row xl:flex-1" onSubmit={handleSearch}>
          <input
            className="input input-bordered h-12 w-full rounded-full border-emerald-500/20 bg-white/10 px-5 text-emerald-50 placeholder:text-emerald-50/40 focus:border-emerald-400"
            type="text"
            placeholder="Cerca tra migliaia di videogiochi"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <button className="btn border-0 bg-emerald-500 px-8 text-slate-950 hover:bg-emerald-400" type="submit">
            Cerca
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-2 xl:justify-end">
          {user ? (
            <>
              <Link
                className="flex max-w-full items-center gap-3 rounded-full bg-white/10 px-3 py-2 text-sm font-bold text-emerald-50 transition hover:bg-emerald-500/20"
                to={routes.profile}
              >
                {avatarUrl ? (
                  <img className="h-9 w-9 rounded-full object-cover" src={avatarUrl} alt="Avatar utente" />
                ) : (
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-500 text-slate-950">
                    {profileName.charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="max-w-32 truncate">{profileName}</span>
              </Link>

              <Link className="btn btn-ghost btn-sm text-emerald-50 hover:bg-white/10 sm:btn-md" to={routes.favorites}>
                Preferiti
              </Link>

              <button
                className="btn btn-sm border-0 bg-rose-500 text-white hover:bg-rose-400 sm:btn-md"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-ghost btn-sm text-emerald-50 hover:bg-white/10 sm:btn-md" to={routes.login}>
                Login
              </Link>

              <Link className="btn btn-sm border-0 bg-emerald-500 text-slate-950 hover:bg-emerald-400 sm:btn-md" to={routes.register}>
                Registrati
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

import { Link } from 'react-router-dom'
import { useUserContext } from '../context/UserContext.jsx'
import routes from '../router/routes.js'

const topLinks = [
  {
    label: 'Best of the year',
    path: '/search/best games 2026',
  },
  {
    label: 'Popolari nel 2026',
    path: '/search/popular games 2026',
  },
  {
    label: 'Classici da giocare',
    path: '/search/best classic games',
  },
]

const platformLinks = [
  {
    label: 'PC',
    path: '/search/pc games',
  },
  {
    label: 'PlayStation',
    path: '/search/playstation games',
  },
  {
    label: 'Xbox',
    path: '/search/xbox games',
  },
  {
    label: 'Nintendo',
    path: '/search/nintendo games',
  },
]

function Sidebar({ genres }) {
  const { user } = useUserContext()

  return (
    <aside className="min-w-0 rounded-lg border border-emerald-500/10 bg-[#111715] p-4 text-emerald-50 shadow-xl shadow-black/20 lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:overflow-y-auto">
      <div className="mb-7 space-y-3">
        <Link className="block text-2xl font-black hover:text-emerald-300" to={routes.home}>
          Home
        </Link>

        {user && (
          <>
            <Link className="block text-lg font-bold text-emerald-50/80 hover:text-emerald-300" to={routes.profile}>
              Profilo
            </Link>
            <Link className="block text-lg font-bold text-emerald-50/80 hover:text-emerald-300" to={routes.favorites}>
              Preferiti
            </Link>
          </>
        )}
      </div>

      <section className="mb-7">
        <h2 className="mb-4 text-xl font-black">Top</h2>
        <div className="space-y-2 text-emerald-50/80">
          {topLinks.map((link) => (
            <Link
              className="block rounded bg-white/5 px-3 py-2 transition hover:bg-rose-500/20 hover:text-rose-100"
              key={link.label}
              to={link.path}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-7">
        <h2 className="mb-4 text-xl font-black">Piattaforme</h2>
        <div className="flex max-w-full gap-3 overflow-x-auto pb-2 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0">
          {platformLinks.map((platform) => (
            <Link
              className="whitespace-nowrap rounded bg-white/5 px-3 py-2 text-emerald-50/80 transition hover:bg-rose-500/20 hover:text-rose-100"
              key={platform.label}
              to={platform.path}
            >
              {platform.label}
            </Link>
          ))}
        </div>
      </section>

      <h2 className="mb-4 text-xl font-black">Generi</h2>

      <div className="flex max-w-full gap-3 overflow-x-auto pb-2 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0">
        {genres.map((genre) => (
          <Link
            className="whitespace-nowrap rounded bg-white/5 px-3 py-2 text-emerald-50/80 transition hover:bg-emerald-500/20 hover:text-emerald-200"
            key={genre.id}
            to={`/genre/${genre.slug}`}
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar

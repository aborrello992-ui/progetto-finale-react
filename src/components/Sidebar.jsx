import { Link } from 'react-router-dom'

function Sidebar({ genres }) {
  return (
    <aside className="rounded-lg bg-base-100 p-4 shadow-sm lg:sticky lg:top-4 lg:h-fit">
      <h2 className="mb-4 text-xl font-bold">Generi</h2>

      <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0">
        {genres.map((genre) => (
          <Link
            className="link-hover whitespace-nowrap text-base-content/80"
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

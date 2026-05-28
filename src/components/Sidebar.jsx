import { Link } from 'react-router-dom'

function Sidebar({ genres }) {
  return (
    <aside className="bg-base-100 p-4">
      <h2 className="mb-4 text-xl font-bold">
        Generi
      </h2>

      <div className="flex flex-col gap-2">
        {genres.map((genre) => (
          <Link
            className="link-hover text-base-content/80"
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
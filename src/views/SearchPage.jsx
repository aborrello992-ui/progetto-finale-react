import { useLoaderData, useParams } from 'react-router-dom'
import GameList from '../components/GameList.jsx'

function SearchPage() {
  const games = useLoaderData()
  const { slug } = useParams()

  return (
    <main className="min-h-screen bg-base-200 py-16">
      <section className="mx-auto w-11/12 max-w-6xl">
        <h1 className="mb-6 text-4xl font-bold">
          Risultati per: {slug}
        </h1>

        <GameList games={games} />
      </section>
    </main>
  )
}

export default SearchPage
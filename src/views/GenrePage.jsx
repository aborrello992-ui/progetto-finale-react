import { useLoaderData, useParams } from 'react-router-dom'
import GameList from '../components/GameList.jsx'

function GenrePage() {
  const games = useLoaderData()
  const { slug } = useParams()

  return (
    <main className="min-h-screen bg-[#0d1110] py-6 text-emerald-50 sm:py-10">
      <section>
        <h1 className="mb-6 text-3xl font-black sm:text-5xl">
          Genere: {slug}
        </h1>

        <GameList games={games} />
      </section>
    </main>
  )
}

export default GenrePage

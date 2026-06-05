import { useLoaderData, useNavigate } from 'react-router-dom'
import Reviews from '../components/Reviews.jsx'

function DetailPage() {
  const game = useLoaderData()
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-base-200 py-8 sm:py-16">
      <section className="mx-auto w-11/12 max-w-6xl">
        <button
          className="btn btn-ghost mb-6"
          type="button"
          onClick={() => navigate(-1)}
        >
          Torna indietro
        </button>

        <div className="card bg-base-100 shadow-sm">
          {game.background_image && (
            <figure>
              <img
                className="h-64 w-full object-cover sm:h-96"
                src={game.background_image}
                alt={game.name}
              />
            </figure>
          )}

          <div className="card-body p-4 sm:p-8">
            <h1 className="card-title text-3xl sm:text-4xl">{game.name}</h1>

            <p className="text-base-content/70">
              Data di uscita: {game.released || 'Non disponibile'}
            </p>

            <p className="text-base-content/70">
              Rating: {game.rating ? game.rating : 'Non disponibile'}
            </p>

            <p className="break-words text-base-content/70">
              Sito ufficiale: {game.website || 'Non disponibile'}
            </p>

            {game.description_raw && (
              <p className="mt-4 leading-relaxed">{game.description_raw}</p>
            )}

            <Reviews gameId={game.id} />
          </div>
        </div>
      </section>
    </main>
  )
}

export default DetailPage

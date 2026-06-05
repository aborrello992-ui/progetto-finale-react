import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../context/UserContext.jsx'
import supabase from '../database/supabase.js'

function GameCard({ game }) {
  const { user } = useUserContext()
  const [favoriteMessage, setFavoriteMessage] = useState('')
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    async function checkFavorite() {
      if (!user) {
        setIsFavorite(false)
        return
      }

      const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('game_id', game.id)
        .maybeSingle()

      if (error) {
        console.log(error.message)
        return
      }

      setIsFavorite(Boolean(data))
    }

    checkFavorite()
  }, [user, game.id])

  async function addToFavorites() {
    if (!user) {
      return
    }

    const { error } = await supabase.from('favorites').insert({
      user_id: user.id,
      game_id: game.id,
      game_name: game.name,
      game_image: game.background_image,
      game_rating: game.rating,
      game_released: game.released,
    })

    if (error) {
      if (error.code === '23505') {
        setFavoriteMessage('Questo gioco e gia nei preferiti')
        return
      }

      setFavoriteMessage('Non e stato possibile aggiungere il gioco')
      console.log(error.message)
      return
    }

    setFavoriteMessage('Gioco aggiunto ai preferiti')
    setIsFavorite(true)
  }

  return (
    <article className="card h-full bg-base-100 shadow-sm">
      {game.background_image && (
        <figure>
          <img
            className="h-48 w-full object-cover sm:h-56"
            src={game.background_image}
            alt={game.name}
          />
        </figure>
      )}

      <div className="card-body">
        <h3 className="card-title">{game.name}</h3>
        <p className="text-base-content/70">
          Rating: {game.rating ? game.rating : 'Non disponibile'}
        </p>
        <p className="text-base-content/70">
          Uscita: {game.released || 'Non disponibile'}
        </p>

        {game.genres?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {game.genres.map((genre) => (
              <span className="badge badge-outline" key={genre.id}>
                {genre.name}
              </span>
            ))}
          </div>
        )}

        <div className="card-actions mt-auto flex-col sm:flex-row sm:justify-end">
          {user && (
            <button
              className="btn btn-secondary btn-sm w-full sm:w-auto"
              type="button"
              onClick={addToFavorites}
              disabled={isFavorite}
            >
              {isFavorite ? 'Gia nei preferiti' : 'Aggiungi ai preferiti'}
            </button>
          )}

          <Link className="btn btn-primary btn-sm w-full sm:w-auto" to={`/games/${game.id}`}>
            Dettagli
          </Link>
        </div>

        {favoriteMessage && (
          <p className="mt-2 text-sm text-base-content/70">{favoriteMessage}</p>
        )}
      </div>
    </article>
  )
}

export default GameCard

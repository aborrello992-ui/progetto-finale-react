import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../context/UserContext.jsx'
import supabase from '../database/supabase.js'

function GameCard({ game, variant = 'grid' }) {
  const { user } = useUserContext()
  const [favoriteMessage, setFavoriteMessage] = useState('')
  const [isFavorite, setIsFavorite] = useState(false)
  const isSingleView = variant === 'single'

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
    <article
      className={`overflow-hidden rounded-lg border border-rose-500/20 bg-[#171d1b] shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-emerald-400/40 ${
        isSingleView ? 'grid md:grid-cols-[320px_minmax(0,1fr)]' : 'h-full'
      }`}
    >
      {game.background_image && (
        <figure>
          <img
            className={`w-full object-cover ${isSingleView ? 'h-64 md:h-full' : 'h-48 sm:h-56'}`}
            src={game.background_image}
            alt={game.name}
          />
        </figure>
      )}

      <div className="flex h-full flex-col gap-4 p-5">
        <h3 className="text-2xl font-black leading-tight text-emerald-50">{game.name}</h3>

        <div className="flex flex-col gap-2 rounded-lg border border-white/10 bg-black/20 p-3 sm:flex-row sm:flex-wrap">
          {user && (
            <button
              className="btn btn-sm min-h-10 flex-1 border-0 bg-rose-500 px-4 font-bold text-white hover:bg-rose-400 disabled:bg-rose-950 disabled:text-rose-100 sm:flex-none"
              type="button"
              onClick={addToFavorites}
              disabled={isFavorite}
            >
              {isFavorite ? 'Gia nei preferiti' : 'Aggiungi ai preferiti'}
            </button>
          )}

          <Link
            className="btn btn-sm min-h-10 flex-1 border-0 bg-emerald-500 px-4 font-bold text-slate-950 hover:bg-emerald-400 sm:flex-none"
            to={`/games/${game.id}`}
          >
            Dettagli
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 text-sm text-emerald-50/70">
          <span className="rounded bg-white/10 px-2 py-1">
            Rating: {game.rating ? game.rating : 'Non disponibile'}
          </span>
          <span className="rounded bg-white/10 px-2 py-1">
            Uscita: {game.released || 'Non disponibile'}
          </span>
        </div>

        {game.genres?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {game.genres.map((genre) => (
              <span className="rounded-full border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-300" key={genre.id}>
                {genre.name}
              </span>
            ))}
          </div>
        )}

        {favoriteMessage && <p className="text-sm text-emerald-200/80">{favoriteMessage}</p>}
      </div>
    </article>
  )
}

export default GameCard

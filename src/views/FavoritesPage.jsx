import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../context/UserContext.jsx'
import supabase from '../database/supabase.js'

function FavoritesPage() {
  const { user } = useUserContext()
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    async function getFavorites() {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)

      if (error) {
        console.log(error.message)
        return
      }

      setFavorites(data)
    }

    getFavorites()
  }, [user])

  async function removeFavorite(favoriteId) {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('id', favoriteId)

    if (error) {
      console.log(error.message)
      return
    }

    setFavorites((previousFavorites) =>
      previousFavorites.filter((favorite) => favorite.id !== favoriteId)
    )
  }

  return (
    <section className="mx-auto min-h-[70vh] w-11/12 max-w-6xl py-8 sm:py-16">
      <h1 className="mb-8 text-2xl font-bold sm:text-3xl">I miei preferiti</h1>

      {favorites.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {favorites.map((favorite) => (
            <article key={favorite.id} className="rounded-lg bg-base-100 p-4 shadow">
              {favorite.game_image && (
                <img
                  className="mb-4 h-48 w-full rounded object-cover"
                  src={favorite.game_image}
                  alt={favorite.game_name}
                />
              )}

              <h2 className="mb-2 text-xl font-bold">{favorite.game_name}</h2>

              <p>Rating: {favorite.game_rating || 'Non disponibile'}</p>
              <p>Uscita: {favorite.game_released || 'Non disponibile'}</p>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <Link className="btn btn-primary btn-sm" to={`/games/${favorite.game_id}`}>
                  Dettagli
                </Link>

                <button
                  className="btn btn-error btn-sm"
                  type="button"
                  onClick={() => removeFavorite(favorite.id)}
                >
                  Rimuovi dai preferiti
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p>Non hai ancora aggiunto videogiochi ai preferiti.</p>
      )}
    </section>
  )
}

export default FavoritesPage

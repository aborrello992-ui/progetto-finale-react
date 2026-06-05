import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../database/supabase.js'
import { useUserContext } from '../context/UserContext.jsx'

function UserFavorites() {
  const { user } = useUserContext()
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    async function getUserFavorites() {
      if (!user) {
        return
      }

      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.log(error.message)
        return
      }

      setFavorites(data)
    }

    getUserFavorites()
  }, [user])

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-2xl font-bold">I miei preferiti</h2>

      {favorites.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {favorites.map((favorite) => (
            <article
              className="rounded-lg bg-base-100 p-4 shadow"
              key={favorite.id}
            >
              {favorite.game_image && (
                <img
                  className="mb-4 h-40 w-full rounded object-cover"
                  src={favorite.game_image}
                  alt={favorite.game_name}
                />
              )}

              <h3 className="mb-2 font-bold">{favorite.game_name}</h3>

              <p className="text-sm text-base-content/70">
                Rating: {favorite.game_rating || 'Non disponibile'}
              </p>

              <p className="text-sm text-base-content/70">
                Uscita: {favorite.game_released || 'Non disponibile'}
              </p>

              <Link
                className="btn btn-primary btn-sm mt-4"
                to={`/games/${favorite.game_id}`}
              >
                Vai al gioco
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>Non hai ancora aggiunto giochi ai preferiti.</p>
      )}
    </section>
  )
}

export default UserFavorites
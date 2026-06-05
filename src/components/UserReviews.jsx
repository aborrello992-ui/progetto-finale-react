import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../database/supabase.js'
import { useUserContext } from '../context/UserContext.jsx'

function UserReviews() {
  const { user } = useUserContext()
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    async function getUserReviews() {
      if (!user) {
        return
      }

      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.log(error.message)
        return
      }

      setReviews(data)
    }

    getUserReviews()
  }, [user])

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-2xl font-bold">Le mie recensioni</h2>

      {reviews.length > 0 ? (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <article
              className="rounded-lg bg-base-100 p-5 shadow"
              key={review.id}
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="badge badge-primary">
                  Voto: {review.rating}/5
                </span>

                <span className="text-sm text-base-content/60">
                  {new Date(review.created_at).toLocaleDateString('it-IT')}
                </span>
              </div>

              <p className="mb-4 leading-relaxed">{review.comment}</p>

              <Link
                className="btn btn-primary btn-sm"
                to={`/games/${review.game_id}`}
              >
                Vai al gioco
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>Non hai ancora scritto recensioni.</p>
      )}
    </section>
  )
}

export default UserReviews
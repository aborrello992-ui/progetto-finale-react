/* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import supabase from '../database/supabase.js'
import { useUserContext } from '../context/UserContext.jsx'

function Reviews({ gameId }) {
  const { user } = useUserContext()
  const [reviews, setReviews] = useState([])
  const [message, setMessage] = useState('')
  const userReview = reviews.find((review) => review.user_id === user?.id)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  async function getReviews() {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('game_id', gameId)
      .order('created_at', { ascending: false })

    if (error) {
      console.log(error.message)
      return
    }

    setReviews(data)
  }

  useEffect(() => {
    getReviews()
  }, [gameId])

  async function onSubmit(formData) {
    if (!user) {
      setMessage('Devi effettuare il login per scrivere una recensione')
      return
    }

    const username = user.user_metadata?.username || user.email || 'Utente'

    const { error } = await supabase.from('reviews').insert({
      user_id: user.id,
      game_id: gameId,
      username: username,
      rating: Number(formData.rating),
      comment: formData.comment,
    })

    if (error) {
      if (error.code === '23505') {
        setMessage('Hai già recensito questo gioco')
        return
      }

      setMessage('Non è stato possibile salvare la recensione')
      console.log(error.message)
      return
    }

    setMessage('Recensione pubblicata')
    reset()
    getReviews()
  }
  async function deleteReview(reviewId) {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId)

    if (error) {
      console.log(error.message)
      return
    }

    setReviews((previousReviews) =>
      previousReviews.filter((review) => review.id !== reviewId)
    )
  }
  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">Recensioni</h2>

      {userReview ? (
        <div className="mb-8 rounded-lg bg-base-100 p-6 shadow">
          <p className="font-semibold">Hai già recensito questo gioco.</p>
        </div>
      ) : user ? (
        <form
          className="mb-8 flex max-w-xl flex-col gap-4 rounded-lg bg-base-100 p-6 shadow"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="form-control">
            <span className="label-text mb-2">Voto da 1 a 5</span>

            <input
              className="input input-bordered"
              type="number"
              min="1"
              max="5"
              {...register('rating', {
                required: 'Il voto è obbligatorio',
                min: {
                  value: 1,
                  message: 'Il voto minimo è 1',
                },
                max: {
                  value: 5,
                  message: 'Il voto massimo è 5',
                },
              })}
            />

            {errors.rating && (
              <span className="mt-1 text-sm text-error">
                {errors.rating.message}
              </span>
            )}
          </label>

          <label className="form-control">
            <span className="label-text mb-2">Commento</span>

            <textarea
              className="textarea textarea-bordered min-h-32"
              placeholder="Scrivi la tua recensione"
              {...register('comment', {
                required: 'Il commento è obbligatorio',
                maxLength: {
                  value: 500,
                  message: 'Il commento può contenere al massimo 500 caratteri',
                },
              })}
            />

            {errors.comment && (
              <span className="mt-1 text-sm text-error">
                {errors.comment.message}
              </span>
            )}
          </label>

          <button className="btn btn-primary" type="submit">
            Pubblica recensione
          </button>

          {message && <p className="text-sm text-base-content/70">{message}</p>}
        </form>
      ) : (
        <p className="mb-8">Effettua il login per scrivere una recensione.</p>
      )}

      <p>Recensioni trovate: {reviews.length}</p>
      <div className="mt-6 flex flex-col gap-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <article
              className="rounded-lg bg-base-100 p-6 shadow"
              key={review.id}
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-bold">{review.username}</h3>

                <span className="badge badge-primary">
                  Voto: {review.rating}/5
                </span>
              </div>

              <p className="leading-relaxed">{review.comment}</p>

              <p className="mt-4 text-sm text-base-content/60">
                Pubblicata il{' '}
                {new Date(review.created_at).toLocaleDateString('it-IT')}
              </p>
              {user?.id === review.user_id && (
                <button
                  className="btn btn-error btn-sm mt-4"
                  type="button"
                  onClick={() => deleteReview(review.id)}
                >
                  Elimina recensione
                </button>
              )}
            </article>
          ))
        ) : (
          <p>Non ci sono ancora recensioni per questo gioco.</p>
        )}
      </div>
    </section>
  )
}

export default Reviews

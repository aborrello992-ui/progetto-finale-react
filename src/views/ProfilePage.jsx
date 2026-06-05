import { useState } from 'react'
import { useForm } from 'react-hook-form'
import UserFavorites from '../components/UserFavorites.jsx'
import UserReviews from '../components/UserReviews.jsx'
import { useUserContext } from '../context/UserContext.jsx'
import supabase from '../database/supabase.js'

function ProfilePage() {
  const { user, profile, updateProfile } = useUserContext()
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState('')
  const [profileMessage, setProfileMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      username: profile?.username || '',
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
    },
  })

  function handleAvatarChange(event) {
    const file = event.target.files[0]

    if (!file) {
      return
    }

    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  async function handleAvatarSubmit(event) {
    event.preventDefault()

    if (!avatarFile || !user) {
      return
    }

    const fileExtension = avatarFile.name.split('.').pop()
    const filePath = `${user.id}/avatar.${fileExtension}`

    const { error } = await supabase.storage
      .from('avatar')
      .upload(filePath, avatarFile, {
        upsert: true,
      })

    if (error) {
      setProfileMessage('Non e stato possibile caricare l avatar')
      console.log(error.message)
      return
    }

    await updateProfile({
      avatar_url: filePath,
    })

    setProfileMessage('Avatar aggiornato')
  }

  async function onUpdateProfile(data) {
    await updateProfile({
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
    })

    setProfileMessage('Profilo aggiornato')
  }

  const avatarUrl =
    avatarPreview ||
    (profile?.avatar_url
      ? supabase.storage.from('avatar').getPublicUrl(profile.avatar_url).data.publicUrl
      : 'https://placehold.co/200x200?text=Avatar')

  return (
    <section className="mx-auto flex min-h-[70vh] w-11/12 max-w-4xl flex-col gap-6 py-8 sm:py-16">
      <div className="rounded-lg bg-base-100 p-4 shadow sm:p-8">
        <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Profilo utente</h1>

        {user ? (
          <>
            <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-start">
              <div className="flex w-full flex-col items-start gap-4 md:w-auto">
                <img
                  className="h-28 w-28 rounded-full object-cover"
                  src={avatarUrl}
                  alt="Avatar utente"
                />

                <form className="flex w-full flex-col gap-3 md:w-auto" onSubmit={handleAvatarSubmit}>
                  <input
                    className="file-input file-input-bordered w-full"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />

                  <button className="btn btn-primary btn-sm" type="submit">
                    Aggiorna avatar
                  </button>
                </form>
              </div>

              <div className="space-y-3 break-words">
                <p>
                  <strong>Email:</strong> {user.email}
                </p>

                <p>
                  <strong>Username:</strong> {profile?.username || 'Non disponibile'}
                </p>

                <p>
                  <strong>Nome:</strong> {profile?.first_name || 'Non disponibile'}
                </p>

                <p>
                  <strong>Cognome:</strong> {profile?.last_name || 'Non disponibile'}
                </p>
              </div>
            </div>

            {profileMessage && (
              <p className="mb-6 text-sm text-base-content/70">{profileMessage}</p>
            )}

            <form
              className="flex flex-col gap-4 rounded-lg bg-base-200 p-4 shadow-sm sm:p-6"
              onSubmit={handleSubmit(onUpdateProfile)}
            >
              <h2 className="text-xl font-bold sm:text-2xl">Modifica profilo</h2>

              <label className="form-control">
                <span className="label-text mb-2">Username</span>
                <input
                  className="input input-bordered w-full"
                  type="text"
                  {...register('username', {
                    required: 'Lo username e obbligatorio',
                    maxLength: {
                      value: 50,
                      message: 'Lo username puo contenere al massimo 50 caratteri',
                    },
                  })}
                />
                {errors.username && (
                  <span className="mt-1 text-sm text-error">{errors.username.message}</span>
                )}
              </label>

              <label className="form-control">
                <span className="label-text mb-2">Nome</span>
                <input
                  className="input input-bordered w-full"
                  type="text"
                  {...register('first_name', {
                    required: 'Il nome e obbligatorio',
                    maxLength: {
                      value: 50,
                      message: 'Il nome puo contenere al massimo 50 caratteri',
                    },
                  })}
                />
                {errors.first_name && (
                  <span className="mt-1 text-sm text-error">{errors.first_name.message}</span>
                )}
              </label>

              <label className="form-control">
                <span className="label-text mb-2">Cognome</span>
                <input
                  className="input input-bordered w-full"
                  type="text"
                  {...register('last_name', {
                    required: 'Il cognome e obbligatorio',
                    maxLength: {
                      value: 50,
                      message: 'Il cognome puo contenere al massimo 50 caratteri',
                    },
                  })}
                />
                {errors.last_name && (
                  <span className="mt-1 text-sm text-error">{errors.last_name.message}</span>
                )}
              </label>

              <button className="btn btn-primary" type="submit">
                Aggiorna profilo
              </button>
            </form>
          </>
        ) : (
          <p>Non hai ancora effettuato il login.</p>
        )}
      </div>

      <UserFavorites />
      <UserReviews />
    </section>
  )
}

export default ProfilePage

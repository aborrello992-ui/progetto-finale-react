import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext.jsx'
import supabase from '../../database/supabase.js'

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const { setUser, getProfile } = useUserContext()

  async function onSubmit(data) {
    const { data: registerData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          username: data.username,
          first_name: data.first_name,
          last_name: data.last_name,
        },
      },
    })

    if (error) {
      console.log(error.message)
      return
    }

    const { error: profileError } = await supabase.from('profiles').insert({
      id: registerData.user.id,
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
    })

    if (profileError) {
      console.log(profileError.message)
      return
    }

    setUser(registerData.user)
    getProfile(registerData.user.id)
    navigate('/')
  }

  return (
    <section className="bg-base-200 py-8 sm:py-16">
      <div className="mx-auto w-11/12 max-w-md">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h1 className="card-title text-3xl">Registrazione</h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              <label className="form-control">
                <span className="label-text mb-2">Username</span>
                <input
                  className="input input-bordered w-full"
                  type="text"
                  placeholder="Scegli uno username"
                  {...register('username', {
                    required: 'Lo username e obbligatorio',
                    maxLength: {
                      value: 50,
                      message: 'Lo username puo contenere al massimo 50 caratteri',
                    },
                  })}
                />
                {errors.username && (
                  <span className="text-sm text-error">{errors.username.message}</span>
                )}
              </label>

              <label className="form-control">
                <span className="label-text mb-2">Nome</span>
                <input
                  className="input input-bordered w-full"
                  type="text"
                  placeholder="Inserisci il tuo nome"
                  {...register('first_name', {
                    required: 'Il nome e obbligatorio',
                    maxLength: {
                      value: 50,
                      message: 'Il nome puo contenere al massimo 50 caratteri',
                    },
                  })}
                />
                {errors.first_name && (
                  <span className="text-sm text-error">{errors.first_name.message}</span>
                )}
              </label>

              <label className="form-control">
                <span className="label-text mb-2">Cognome</span>
                <input
                  className="input input-bordered w-full"
                  type="text"
                  placeholder="Inserisci il tuo cognome"
                  {...register('last_name', {
                    required: 'Il cognome e obbligatorio',
                    maxLength: {
                      value: 50,
                      message: 'Il cognome puo contenere al massimo 50 caratteri',
                    },
                  })}
                />
                {errors.last_name && (
                  <span className="text-sm text-error">{errors.last_name.message}</span>
                )}
              </label>

              <label className="form-control">
                <span className="label-text mb-2">Email</span>
                <input
                  className="input input-bordered w-full"
                  type="email"
                  placeholder="Inserisci la tua email"
                  {...register('email', {
                    required: 'La email e obbligatoria',
                    maxLength: {
                      value: 50,
                      message: 'La email puo contenere al massimo 50 caratteri',
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-sm text-error">{errors.email.message}</span>
                )}
              </label>

              <label className="form-control">
                <span className="label-text mb-2">Password</span>
                <input
                  className="input input-bordered w-full"
                  type="password"
                  placeholder="Scegli una password"
                  {...register('password', {
                    required: 'La password e obbligatoria',
                    maxLength: {
                      value: 50,
                      message: 'La password puo contenere al massimo 50 caratteri',
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-sm text-error">{errors.password.message}</span>
                )}
              </label>

              <button className="btn btn-primary" type="submit">
                Registrati
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegisterPage

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext.jsx'
import supabase from '../../database/supabase.js'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const { setUser, getProfile } = useUserContext()

  async function onSubmit(data) {
    const { data: loginData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      console.log(error.message)
      return
    }

    setUser(loginData.user)
    getProfile(loginData.user.id)
    navigate('/')
  }

  return (
    <section className="flex min-h-[70vh] items-center bg-base-200 py-8 sm:py-16">
      <div className="mx-auto w-11/12 max-w-md">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h1 className="card-title text-3xl">Login</h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
                  placeholder="Inserisci la password"
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
                Accedi
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage

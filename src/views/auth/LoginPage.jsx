import { useForm } from 'react-hook-form'
function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  function onSubmit(data) {
    console.log(data)
  }
  return (
    <main className="min-h-screen bg-base-200 py-16">
      <section className="mx-auto w-11/12 max-w-md">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h1 className="card-title text-3xl">
              Login
            </h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              <label className="form-control">
                <span className="label-text mb-2">
                  Email
                </span>
                <input
                  className="input input-bordered"
                  type="email"
                  placeholder="Inserisci la tua email"
                  {...register('email', {
                    required: 'La email e obbligatoria',
                    maxLength: {
                      value: 50,
                      message: 'La email puo contenere al massimo 50 caratteri',
                    },
                  })}
                />{errors.email && (
                  <span className="text-sm text-error">
                    {errors.email.message}
                  </span>
                )}
              </label>

              <label className="form-control">
                <span className="label-text mb-2">
                  Password
                </span>
                <input
                  className="input input-bordered"
                  type="password"
                  placeholder="Inserisci la password"
                  {...register('password', {
                    required: 'La password e obbligatoria',
                    maxLength: {
                      value: 50,
                      message: 'La password puo contenere al massimo 50 caratteri',
                    },
                  })}
                />{errors.password && (
                  <span className="text-sm text-error">
                    {errors.password.message}
                  </span>
                )}
              </label>

              <button className="btn btn-primary" type="submit">
                Accedi
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
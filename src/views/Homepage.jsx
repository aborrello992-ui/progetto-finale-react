import { useLoaderData } from 'react-router-dom'
import GameList from '../components/GameList.jsx'

function Homepage() {
  const games = useLoaderData()

  return (
    <main className="min-h-screen bg-[#0d1110] text-emerald-50">
      <section className="flex min-h-[48vh] flex-col justify-center gap-6 rounded-lg border border-emerald-500/10 bg-[#111715] px-5 py-10 shadow-xl shadow-black/20 sm:px-10 sm:py-16">
        <p className="text-sm font-black uppercase tracking-wide text-emerald-400">
          Progetto finale React
        </p>

        <h1 className="max-w-3xl text-5xl font-black leading-tight text-emerald-50 sm:text-7xl">
          Rehacktor
        </h1>

        <p className="max-w-2xl text-lg text-emerald-50/70">
          Un portale dedicato ai videogiochi, con ricerca, filtri, pagine di
          dettaglio, profilo utente, preferiti e recensioni.
        </p>

        <a className="btn w-fit border-0 bg-emerald-500 text-slate-950 hover:bg-emerald-400" href="#videogiochi">
          Esplora i videogiochi
        </a>
      </section>

      <section id="videogiochi" className="py-10 sm:py-12">
        <h2 className="mb-6 text-3xl font-black sm:text-4xl">Videogiochi del 2026</h2>

        <GameList games={games} />
      </section>
    </main>
  )
}

export default Homepage

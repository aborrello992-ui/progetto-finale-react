import { useLoaderData } from "react-router-dom";
import GameList from "../components/GameList.jsx";

function Homepage() {
  const games = useLoaderData();

  return (
    <main className="min-h-screen bg-base-200">
      <section className="mx-auto flex min-h-[70vh] w-11/12 max-w-6xl flex-col justify-center gap-6 py-16">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">
          Progetto finale React
        </p>

        <h1 className="max-w-3xl text-5xl font-bold leading-tight">
          Rehacktor
        </h1>

        <p className="max-w-2xl text-lg text-base-content/70">
          Un portale dedicato ai videogiochi, con ricerca, filtri, pagine di
          dettaglio, profilo utente, preferiti e recensioni.
        </p>

        <button className="btn btn-primary w-fit">Esplora i videogiochi</button>
      </section>

      <section className="mx-auto w-11/12 max-w-6xl pb-16">
        <h2 className="mb-6 text-3xl font-bold">Videogiochi del 2026</h2>

        <GameList games={games} />
      </section>
    </main>
  );
}

export default Homepage;

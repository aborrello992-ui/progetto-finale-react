import { useLoaderData, useNavigate } from "react-router-dom";

function DetailPage() {
  const game = useLoaderData();
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-base-200 py-16">
      <section className="mx-auto w-11/12 max-w-6xl">
        <button
          className="btn btn-ghost mb-6"
          type="button"
          onClick={() => navigate(-1)}
        >
          Torna indietro
        </button>

        <div className="card bg-base-100 shadow-sm">
          {game.background_image && (
            <figure>
              <img
                className="h-96 w-full object-cover"
                src={game.background_image}
                alt={game.name}
              />
            </figure>
          )}

          <div className="card-body">
            <h1 className="card-title text-4xl">{game.name}</h1>

            <p className="text-base-content/70">
              Data di uscita: {game.released || "Non disponibile"}
            </p>

            <p className="text-base-content/70">
              Rating: {game.rating ? game.rating : "Non disponibile"}
            </p>

            <p className="text-base-content/70">
              Sito ufficiale: {game.website || "Non disponibile"}
            </p>

            {game.description_raw && (
              <p className="mt-4 leading-relaxed">{game.description_raw}</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default DetailPage;

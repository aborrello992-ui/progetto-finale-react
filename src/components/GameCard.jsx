import { Link } from "react-router-dom";

function GameCard({ game }) {
  return (
    <article className="card bg-base-100 shadow-sm">
      {game.background_image && (
        <figure>
          <img
            className="h-56 w-full object-cover"
            src={game.background_image}
            alt={game.name}
          />
        </figure>
      )}

      <div className="card-body">
        <h3 className="card-title">{game.name}</h3>
        <p className="text-base-content/70">
          Rating: {game.rating ? game.rating : "Non disponibile"}
        </p>
        <p className="text-base-content/70">
          Uscita: {game.released || "Non disponibile"}
        </p>
        {game.genres.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {game.genres.map((genre) => (
              <span className="badge badge-outline" key={genre.id}>
                {genre.name}
              </span>
            ))}
          </div>
        )}
        <div className="card-actions justify-end">
          <Link className="btn btn-primary" to={`/games/${game.id}`}>
            Dettagli
          </Link>
        </div>
      </div>
    </article>
  );
}

export default GameCard;

import GameCard from "./GameCard.jsx";

function GameList({ games }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {games.map((game) => (
        <GameCard game={game} key={game.id} />
      ))}
    </div>
  );
}

export default GameList;

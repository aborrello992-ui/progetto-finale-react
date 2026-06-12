import { useState } from 'react'
import GameCard from './GameCard.jsx'

function GameList({ games }) {
  const [viewMode, setViewMode] = useState('grid')

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300/80">
          {games.length} giochi trovati
        </p>

        <div className="flex w-full rounded-lg border border-emerald-500/20 bg-white/5 p-1 sm:w-auto">
          <button
            className={`btn btn-sm flex-1 border-0 sm:flex-none ${viewMode === 'grid' ? 'bg-emerald-500 text-slate-950' : 'bg-transparent text-emerald-50 hover:bg-white/10'}`}
            type="button"
            onClick={() => setViewMode('grid')}
          >
            Griglia
          </button>

          <button
            className={`btn btn-sm flex-1 border-0 sm:flex-none ${viewMode === 'single' ? 'bg-emerald-500 text-slate-950' : 'bg-transparent text-emerald-50 hover:bg-white/10'}`}
            type="button"
            onClick={() => setViewMode('single')}
          >
            Singola
          </button>
        </div>
      </div>

      <div className={viewMode === 'grid' ? 'grid gap-6 md:grid-cols-2 2xl:grid-cols-3' : 'grid gap-5'}>
        {games.map((game) => (
          <GameCard game={game} key={game.id} variant={viewMode} />
        ))}
      </div>
    </div>
  )
}

export default GameList

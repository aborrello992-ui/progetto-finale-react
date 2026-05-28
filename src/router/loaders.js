const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

async function getCurrentYearGames() {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&dates=2026-01-01,2026-12-31&page_size=12`,
  );

  const data = await response.json();

  return data.results;
}

async function getSearchedGames({ params }) {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&search=${params.slug}&page_size=12`,
  );

  const data = await response.json();

  return data.results;
}
async function getGenres() {
  const response = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`);

  const data = await response.json();

  return data.results;
}

async function getGamesByGenre({ params }) {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&genres=${params.slug}&page_size=12`,
  );

  const data = await response.json();

  return data.results;
}
async function getGameDetail({ params }) {
  const response = await fetch(
    `https://api.rawg.io/api/games/${params.id}?key=${API_KEY}`,
  );

  const data = await response.json();

  return data;
}

export {
  getCurrentYearGames,
  getSearchedGames,
  getGenres,
  getGamesByGenre,
  getGameDetail,
};

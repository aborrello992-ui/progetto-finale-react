import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layouts/Layout.jsx'
import Homepage from '../views/Homepage.jsx'
import SearchPage from '../views/SearchPage.jsx'
import GenrePage from '../views/GenrePage.jsx'
import routes from './routes.js'
import {
  getCurrentYearGames,
  getSearchedGames,
  getGenres,
  getGamesByGenre,
} from './loaders.js'

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Layout />,
    loader: getGenres,
    children: [
      {
        index: true,
        element: <Homepage />,
        loader: getCurrentYearGames,
      },
      {
        path: routes.search,
        element: <SearchPage />,
        loader: getSearchedGames,
      },
      {
        path: routes.genre,
        element: <GenrePage />,
        loader: getGamesByGenre,
      },
    ],
  },
])

export default router

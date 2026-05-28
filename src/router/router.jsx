import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout.jsx";
import Homepage from "../views/Homepage.jsx";
import SearchPage from "../views/SearchPage.jsx";
import GenrePage from "../views/GenrePage.jsx";
import DetailPage from "../views/DetailPage.jsx";
import routes from "./routes.js";
import LoginPage from '../views/auth/LoginPage.jsx'
import RegisterPage from '../views/auth/RegisterPage.jsx'
import {
  getCurrentYearGames,
  getSearchedGames,
  getGenres,
  getGamesByGenre,
  getGameDetail,
} from "./loaders.js";

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

      {
        path: routes.detail,
        element: <DetailPage />,
        loader: getGameDetail,
      },
      {
  path: routes.login,
  element: <LoginPage />,
},
{
  path: routes.register,
  element: <RegisterPage />,
},
    ],
  },
]);

export default router;

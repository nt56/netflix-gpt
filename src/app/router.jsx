import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import ErrorPage from "../components/ErrorPage";
import { GuestRoute, ProtectedRoute } from "../features/auth/RouteGuards";
import LoginPage from "../features/auth/LoginPage";
import BrowsePage from "../features/discover/BrowsePage";
import MovieDetailPage from "../features/title/MovieDetailPage";

// Created once, outside React, so it is never rebuilt on re-render
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <GuestRoute />,
        children: [{ path: "/", element: <LoginPage /> }],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/browse", element: <BrowsePage /> },
          { path: "/movie/:movieId", element: <MovieDetailPage /> },
        ],
      },
      { path: "/error", element: <ErrorPage /> },
    ],
  },
]);

export default router;

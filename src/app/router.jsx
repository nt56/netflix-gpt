import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import CrashScreen from "../components/CrashScreen";
import NotFoundPage from "../components/NotFoundPage";
import { GuestRoute, ProtectedRoute } from "../features/auth/RouteGuards";
import LoginPage from "../features/auth/LoginPage";
import BrowsePage from "../features/discover/BrowsePage";
import MovieDetailPage from "../features/title/MovieDetailPage";

// Created once, outside React, so it is never rebuilt on re-render
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <CrashScreen />,
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
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;

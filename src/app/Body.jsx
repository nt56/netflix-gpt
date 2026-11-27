import React from "react";
import Browse from "../features/discover/BrowsePage";
import Login from "../features/auth/LoginPage";
import MovieDetail from "../features/title/MovieDetailPage";
import Error from "../components/Error";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: "/browse",
      element: <Browse />,
      errorElement: <Error />,
    },
    {
      path: "/movie/:movieId",
      element: <MovieDetail />,
      errorElement: <Error />,
    },
    {
      path: "/error",
      element: <Error />,
    },
  ]);

  return (
    <div className="w-full min-h-screen bg-dark-950 text-white font-sans antialiased selection:bg-brand selection:text-white">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;

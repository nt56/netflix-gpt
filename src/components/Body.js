import React from "react";
import Browse from "./Browse";
import Login from "./Login";
import MovieDetail from "./MovieDetail";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/movie/:movieId",
      element: <MovieDetail />,
    },
  ]);

  return (
    <div className="w-screen">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;

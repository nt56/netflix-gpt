import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import { useSelector } from "react-redux";
import GPTSearchPage from "./GPTSearchPage";

const Browse = () => {
  const showGPTSearch = useSelector((store) => store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div className="min-h-screen w-full bg-dark-950 text-white font-sans overflow-x-hidden selection:bg-brand selection:text-white">
      <Header />
      {showGPTSearch ? (
        <GPTSearchPage />
      ) : (
        <main className="relative">
          <MainContainer />
          <SecondaryContainer />
        </main>
      )}
    </div>
  );
};

export default Browse;

import React from "react";
import useNowPlayingMovies from "../../hooks/useNowPlayingMovies";
import MainContainer from "./HeroBanner";
import SecondaryContainer from "./BrowseRows";
import usePopularMovies from "../../hooks/usePopularMovies";
import useTopRatedMovies from "../../hooks/useTopRatedMovies";
import useUpcomingMovies from "../../hooks/useUpcomingMovies";
import { useSelector } from "react-redux";
import GPTSearchPage from "../ai/AISearchPage";

const Browse = () => {
  const showGPTSearch = useSelector((store) => store.ai.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div className="min-h-screen w-full bg-dark-950 text-white font-sans overflow-x-hidden selection:bg-brand selection:text-white">
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

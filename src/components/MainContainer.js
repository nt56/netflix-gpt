import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies || movies.length === 0) {
    return (
      <div className="relative w-full aspect-[16/9] max-h-[85vh] bg-dark-950 flex items-center justify-center">
        <div className="shimmer-bg absolute inset-0 opacity-20" />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-brand border-t-transparent rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Loading Premiere...
          </span>
        </div>
      </div>
    );
  }

  const mainMovie = movies[0];
  const { original_title, overview, id, vote_average, release_date, backdrop_path } =
    mainMovie;

  return (
    <div className="relative w-full bg-dark-950 overflow-hidden">
      <VideoTitle
        movieId={id}
        title={original_title}
        overview={overview}
        rating={vote_average}
        releaseDate={release_date}
      />
      <VideoBackground movieId={id} fallbackBackdrop={backdrop_path} />
    </div>
  );
};

export default MainContainer;

import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
import { FaFire, FaStar, FaFilm, FaCalendarAlt } from "react-icons/fa";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store?.movies);

  if (!movies.nowPlayingMovies) return null;

  return (
    <div className="bg-dark-950 w-full relative z-20 pb-16">
      {/* Elevated container overlapping the hero trailer with negative margin */}
      <div className="-mt-16 sm:-mt-24 md:-mt-44 lg:-mt-52 relative z-30 space-y-6 sm:space-y-8">
        <MovieList
          title="Trending Now"
          subtitle="Critically acclaimed movies streaming this week"
          icon={<FaFire className="text-brand" />}
          movies={movies.nowPlayingMovies}
        />

        <div id="movies-section">
          <MovieList
            title="Top Rated Classics & Hits"
            subtitle="Highest rated movies voted by global audiences"
            icon={<FaStar className="text-yellow-400" />}
            movies={movies.topRatedMovies}
          />
        </div>

        <MovieList
          title="Popular on Flixora"
          subtitle="Most watched titles across all genres"
          icon={<FaFilm className="text-blue-400" />}
          movies={movies.popularMovies}
        />

        <div id="upcoming-section">
          <MovieList
            title="Upcoming Blockbusters"
            subtitle="Premieres coming soon to your screen"
            icon={<FaCalendarAlt className="text-purple-400" />}
            movies={movies.upcomingMovies}
          />
        </div>
      </div>
    </div>
  );
};

export default SecondaryContainer;

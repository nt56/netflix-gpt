import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovieCard from "./MovieCard";

const MovieList = ({ title, subtitle, icon, movies }) => {
  const rowRef = useRef(null);

  const scrollRow = (direction) => {
    const row = rowRef.current;
    if (row) {
      row.scrollBy({
        left: direction * row.clientWidth * 0.75,
        behavior: "smooth",
      });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="px-4 sm:px-8 md:px-14 py-2 group/row">
      {/* Category Header */}
      <div className="flex items-end justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-6 rounded-full bg-brand hidden sm:block" />
          <div>
            <div className="flex items-center gap-2">
              {icon && <span className="text-sm sm:text-base">{icon}</span>}
              <h2 className="text-lg sm:text-2xl font-bold font-display text-white tracking-tight">
                {title}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400 font-medium">
                {movies.length}
              </span>
            </div>
            {subtitle && (
              <p className="text-xs text-gray-400 hidden md:block mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Row with Navigation Controls */}
      <div className="relative group/list">
        {/* Left Arrow Button */}
        <button
          type="button"
          aria-label={`Scroll ${title} left`}
          onClick={() => scrollRow(-1)}
          className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 items-center justify-center rounded-full glass-panel bg-dark-900/90 text-white hover:bg-brand hover:scale-110 active:scale-95 transition-all duration-200 opacity-0 group-hover/row:opacity-100 shadow-2xl border border-white/20"
        >
          <FaChevronLeft className="text-sm" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={rowRef}
          className="flex overflow-x-auto no-scrollbar scroll-smooth gap-3 sm:gap-4 md:gap-5 py-4 px-1"
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movieId={movie.id}
              title={movie.title || movie.original_title}
              posterPath={movie.poster_path}
              rating={movie.vote_average}
              releaseDate={movie.release_date}
            />
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          aria-label={`Scroll ${title} right`}
          onClick={() => scrollRow(1)}
          className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 items-center justify-center rounded-full glass-panel bg-dark-900/90 text-white hover:bg-brand hover:scale-110 active:scale-95 transition-all duration-200 opacity-0 group-hover/row:opacity-100 shadow-2xl border border-white/20"
        >
          <FaChevronRight className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default MovieList;

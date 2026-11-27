import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovieCard from "./MovieCard";

const ARROW_CLASS =
  "hidden md:flex absolute top-0 bottom-0 z-10 w-12 items-center justify-center bg-black/60 text-white text-2xl opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity";

const MovieList = ({ title, movies }) => {
  const rowRef = useRef(null);

  // direction: -1 scrolls left, 1 scrolls right
  const scrollRow = (direction) => {
    const row = rowRef.current;
    row.scrollBy({
      left: direction * row.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <div className="px-6 ">
      <h1 className="text-lg md:text-4xl font-bold py-4 text-white">{title}</h1>
      <div className="relative group">
        <button
          type="button"
          aria-label={`Scroll ${title} left`}
          className={`${ARROW_CLASS} left-0`}
          onClick={() => scrollRow(-1)}
        >
          <FaChevronLeft />
        </button>
        <div ref={rowRef} className="flex overflow-x-scroll">
          <div className="flex gap-4 md:gap-6 p-2">
            {movies?.map((movie) => (
              <MovieCard
                key={movie.id}
                movieId={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          aria-label={`Scroll ${title} right`}
          className={`${ARROW_CLASS} right-0`}
          onClick={() => scrollRow(1)}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default MovieList;

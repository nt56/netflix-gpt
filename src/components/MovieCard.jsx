import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IMG_CDN_URL } from "../utils/constants";
import { FaStar, FaPlay } from "react-icons/fa";

const MovieCard = ({ movieId, title, posterPath, rating, releaseDate }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!posterPath) return null;

  const year = releaseDate ? releaseDate.split("-")[0] : null;

  return (
    <Link
      to={"/movie/" + movieId}
      className="group relative block w-32 sm:w-40 md:w-44 lg:w-48 shrink-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:scale-105 md:hover:scale-110 hover:-translate-y-2 hover:shadow-card-hover z-10 hover:z-20 border border-white/5 hover:border-brand/70"
    >
      {/* Skeleton shimmer before image load */}
      {!imageLoaded && (
        <div className="w-full aspect-[2/3] bg-dark-850 shimmer-bg" />
      )}

      {/* Poster Image */}
      <img
        alt={title}
        src={IMG_CDN_URL + posterPath}
        onLoad={() => setImageLoaded(true)}
        className={`w-full aspect-[2/3] object-cover transition-all duration-500 group-hover:brightness-105 ${
          imageLoaded ? "block" : "hidden"
        }`}
      />

      {/* Modern Hover Card Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 pointer-events-none">
        {/* Play Icon Pill */}
        <div className="mb-2 self-start flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-dark-950 font-bold text-[11px] shadow-lg">
          <FaPlay className="text-[9px]" />
          <span>Watch</span>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-xs sm:text-sm line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* Info badges */}
        <div className="mt-1.5 flex items-center justify-between text-[11px] text-gray-300">
          {rating > 0 ? (
            <span className="flex items-center gap-1 text-yellow-400 font-semibold">
              <FaStar className="text-[10px]" />
              {rating.toFixed(1)}
            </span>
          ) : (
            <span />
          )}
          {year && <span className="font-medium text-gray-400">{year}</span>}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;

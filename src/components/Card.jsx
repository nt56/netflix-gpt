import { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaPlay } from "react-icons/fa";
import Skeleton from "./Skeleton";
import { IMG_CDN_URL } from "../config/constants";
import { titlePath } from "../config/routes";

export const CARD_WIDTH = "w-32 sm:w-40 md:w-44 lg:w-48 shrink-0";

// Poster of one title, linking to its detail page
const Card = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { title, posterPath, rating, releaseDate } = item;
  const year = releaseDate ? releaseDate.split("-")[0] : null;

  return (
    <Link
      to={titlePath(item)}
      className={`group relative block ${CARD_WIDTH} rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:scale-105 md:hover:scale-110 hover:-translate-y-2 hover:shadow-card-hover z-10 hover:z-20 border border-white/5 hover:border-brand/70 focus-visible:border-brand focus-visible:outline-none`}
    >
      {/* Skeleton shimmer before image load */}
      {!imageLoaded && <Skeleton className="w-full aspect-[2/3]" />}

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
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 pointer-events-none">
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

export default Card;

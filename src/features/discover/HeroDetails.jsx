import { FaStar } from "react-icons/fa";
import { BsInfoCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { titlePath } from "../../config/routes";

const HeroDetails = ({ movie }) => {
  const { title, overview, rating, releaseDate } = movie;
  const year = releaseDate ? releaseDate.split("-")[0] : null;

  return (
    <div className="w-full aspect-[16/9] max-h-[88vh] pt-[26%] sm:pt-[20%] md:pt-[16%] lg:pt-[14%] px-4 sm:px-10 md:px-16 lg:px-20 absolute top-0 left-0 z-20 flex flex-col justify-center text-white bg-gradient-to-r from-dark-950/95 via-dark-950/70 to-transparent pointer-events-none">
      <div className="max-w-2xl animate-fadeInUp pointer-events-auto">
        {/* Cinematic Badge Header */}
        <div className="flex items-center gap-3 mb-2 sm:mb-3 flex-wrap">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-brand/90 text-white font-extrabold text-[10px] sm:text-xs tracking-wider uppercase shadow-glow">
            <span>Now Playing</span>
          </div>
          {rating > 0 && (
            <div className="flex items-center gap-1 text-xs font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 rounded">
              <FaStar className="text-[11px]" />
              <span>{rating.toFixed(1)}</span>
            </div>
          )}
          {year && (
            <span className="text-xs font-medium text-gray-300 hidden sm:inline-block">
              {year}
            </span>
          )}
        </div>

        {/* Big Movie Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white drop-shadow-2xl line-clamp-2 leading-tight">
          {title}
        </h1>

        {/* Overview Description */}
        <p className="mt-3 text-xs sm:text-sm md:text-base text-gray-300 line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-xl drop-shadow">
          {overview}
        </p>

        {/* Action Buttons */}
        <div className="mt-4 sm:mt-6 flex items-center gap-3 sm:gap-4 flex-wrap">
          <Link
            to={titlePath(movie)}
            className="flex items-center gap-2 sm:gap-3 py-2 sm:py-3 px-5 sm:px-8 bg-white hover:bg-gray-200 text-dark-950 font-extrabold text-xs sm:text-base rounded-xl shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <BsInfoCircleFill className="text-sm sm:text-base" />
            <span>More Info</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroDetails;

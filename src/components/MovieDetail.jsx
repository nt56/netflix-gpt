import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaStar,
  FaClock,
  FaCalendarAlt,
  FaPlay,
  FaUserTie,
  FaFilm,
} from "react-icons/fa";
import Header from "./Header";
import MovieList from "./MovieList";
import useMovieDetails from "../hooks/useMovieDetails";
import { BACKDROP_CDN_URL, IMG_CDN_URL } from "../utils/constants";

const formatRuntime = (minutes) => {
  if (!minutes) return null;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const MovieDetail = () => {
  const { movieId } = useParams();
  const { movie, hasError } = useMovieDetails(movieId);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [movieId]);

  const handleBack = () => {
    if (location.key === "default") {
      navigate("/browse");
    } else {
      navigate(-1);
    }
  };

  const director = movie?.credits?.crew?.find(
    (person) => person.job === "Director"
  );
  const cast = movie?.credits?.cast?.slice(0, 8) ?? [];
  const videos =
    movie?.videos?.results?.filter((video) => video.site === "YouTube") ?? [];
  const trailer =
    videos.find((video) => video.type === "Trailer") ?? videos[0];
  const recommendations = movie?.recommendations?.results ?? [];

  return (
    <div className="min-h-screen w-full bg-dark-950 text-white font-sans overflow-x-hidden">
      <Header />

      {/* Hero Backdrop Banner */}
      <div className="relative w-full min-h-[60vh] md:min-h-[75vh] overflow-hidden">
        {movie?.backdrop_path ? (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              alt={movie.title || "Movie Backdrop"}
              src={BACKDROP_CDN_URL + movie.backdrop_path}
              className="w-full h-full object-cover object-top filter brightness-[0.38]"
            />
            {/* Layered Vignettes & Seamless Bottom Fade into Dark Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/65 to-dark-950/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-950/95 via-dark-950/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-dark-950 via-dark-950 to-transparent pointer-events-none" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-dark-950 shimmer-bg opacity-30" />
        )}

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-14 pt-28 sm:pt-32 pb-12">
          {/* Back Button */}
          <button
            type="button"
            onClick={handleBack}
            className="group mb-8 inline-flex items-center gap-2 py-2 px-5 glass-panel rounded-full text-xs sm:text-sm font-bold text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg border border-white/15"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Browse</span>
          </button>

          {/* Error Message */}
          {hasError && (
            <div className="max-w-md p-6 rounded-2xl bg-red-950/70 border border-red-500/40 text-center mx-auto my-12">
              <p className="text-red-300 font-bold mb-3">
                Unable to load movie details at this time.
              </p>
              <button
                onClick={handleBack}
                className="px-5 py-2 rounded-xl bg-brand text-white font-semibold text-xs shadow-glow"
              >
                Return to Browse
              </button>
            </div>
          )}

          {/* Loading Skeleton */}
          {!movie && !hasError && (
            <div className="flex flex-col md:flex-row gap-8 animate-pulse">
              <div className="w-48 sm:w-64 md:w-80 aspect-[2/3] bg-dark-850 rounded-2xl shimmer-bg" />
              <div className="flex-1 space-y-4">
                <div className="h-10 w-2/3 bg-dark-850 rounded-xl shimmer-bg" />
                <div className="h-5 w-1/3 bg-dark-850 rounded-lg shimmer-bg" />
                <div className="h-24 w-full bg-dark-850 rounded-xl shimmer-bg" />
              </div>
            </div>
          )}

          {/* Loaded Movie Details */}
          {movie && (
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12 animate-fadeInUp">
              {/* Poster Card */}
              {movie.poster_path && (
                <div className="w-56 sm:w-64 md:w-80 shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-white/15 group">
                  <img
                    alt={movie.title}
                    src={IMG_CDN_URL + movie.poster_path}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Main Info */}
              <div className="flex-1 text-center md:text-left">
                {/* Release Type Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/20 border border-brand/40 text-brand text-xs font-bold uppercase tracking-wider mb-3">
                  <span>Flixora Premiere</span>
                </div>

                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white leading-tight">
                  {movie.title}
                </h1>

                {movie.tagline && (
                  <p className="mt-2 text-base sm:text-lg italic text-gray-300 font-light">
                    "{movie.tagline}"
                  </p>
                )}

                {/* Metadata Pills */}
                <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-3">
                  {movie.vote_count > 0 && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs sm:text-sm font-bold">
                      <FaStar className="text-xs" />
                      <span>{movie.vote_average.toFixed(1)} / 10</span>
                      <span className="text-[11px] text-gray-400 font-normal">
                        ({movie.vote_count.toLocaleString()})
                      </span>
                    </div>
                  )}

                  {movie.release_date && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel text-xs sm:text-sm text-gray-300 font-medium">
                      <FaCalendarAlt className="text-xs text-brand" />
                      <span>{movie.release_date.slice(0, 4)}</span>
                    </div>
                  )}

                  {movie.runtime > 0 && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel text-xs sm:text-sm text-gray-300 font-medium">
                      <FaClock className="text-xs text-blue-400" />
                      <span>{formatRuntime(movie.runtime)}</span>
                    </div>
                  )}

                  <div className="px-2.5 py-1 rounded-md border border-white/20 text-gray-300 text-xs font-semibold">
                    4K Ultra HD
                  </div>
                </div>

                {/* Genres */}
                {movie.genres?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                    {movie.genres.map((g) => (
                      <span
                        key={g.id}
                        className="px-3 py-1 rounded-lg bg-dark-800/80 text-xs font-semibold text-gray-300 border border-white/10"
                      >
                        {g.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Overview */}
                <div className="mt-6">
                  <h2 className="text-sm uppercase tracking-wider font-bold text-gray-400 mb-2">
                    Synopsis
                  </h2>
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-3xl">
                    {movie.overview || "No overview available for this title."}
                  </p>
                </div>

                {/* Director */}
                {director && (
                  <div className="mt-6 flex items-center gap-2 justify-center md:justify-start text-sm">
                    <FaUserTie className="text-brand text-base" />
                    <span className="text-gray-400">Directed by</span>
                    <span className="font-bold text-white">{director.name}</span>
                  </div>
                )}

                {/* Action Buttons */}
                {trailer && (
                  <div className="mt-6 flex items-center gap-4 justify-center md:justify-start">
                    <a
                      href="#trailer-section"
                      className="inline-flex items-center gap-2 py-3 px-7 rounded-xl bg-white hover:bg-gray-200 text-dark-950 font-extrabold text-sm shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      <FaPlay className="text-xs" />
                      <span>Watch Trailer</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cast Showcase Section */}
      {cast.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14 py-8">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1.5 h-5 rounded-full bg-brand" />
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Featured Cast
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {cast.map((person) => (
              <div
                key={person.credit_id}
                className="glass-card p-3.5 rounded-xl border border-white/5 hover:border-brand/40 transition-all duration-200"
              >
                <p className="font-bold text-sm text-white truncate">
                  {person.name}
                </p>
                <p className="text-xs text-gray-400 truncate mt-0.5">
                  {person.character || "Cast"}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Embedded Trailer Section */}
      {trailer && (
        <section
          id="trailer-section"
          className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14 py-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-5 rounded-full bg-brand" />
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Official Trailer
            </h2>
          </div>

          <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden glass-panel border border-white/15 shadow-2xl aspect-video">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailer.key}?rel=0&modestbranding=1`}
              title={trailer.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {/* More Like This (Recommendations) */}
      {recommendations.length > 0 && (
        <section className="max-w-7xl mx-auto py-8">
          <MovieList
            title="More Like This"
            subtitle="Audiences who watched this also enjoyed"
            icon={<FaFilm className="text-brand" />}
            movies={recommendations}
          />
        </section>
      )}

      {/* Footer */}
      <footer className="mt-12 py-8 text-center text-xs text-gray-500 border-t border-white/5">
        <p>© 2026 Flixora. TMDB & Gemini AI Integration.</p>
      </footer>
    </div>
  );
};

export default MovieDetail;

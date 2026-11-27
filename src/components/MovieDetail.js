import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import Header from "./Header";
import MovieList from "./MovieList";
import useMovieDetails from "../hooks/useMovieDetails";
import { BACKDROP_CDN_URL, IMG_CDN_URL } from "../utils/constants";

const formatRuntime = (minutes) =>
  `${Math.floor(minutes / 60)}h ${minutes % 60}m`;

const MovieDetail = () => {
  const { movieId } = useParams();
  const { movie, hasError } = useMovieDetails(movieId);
  const navigate = useNavigate();
  const location = useLocation();

  // start from the top when another movie is opened
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movieId]);

  // "default" key means this page was opened directly, so there is no history
  const handleBack = () =>
    location.key === "default" ? navigate("/browse") : navigate(-1);

  const director = movie?.credits?.crew?.find(
    (person) => person.job === "Director"
  );
  const cast = movie?.credits?.cast?.slice(0, 8) ?? [];
  const videos =
    movie?.videos?.results?.filter((video) => video.site === "YouTube") ?? [];
  const trailer =
    videos.find((video) => video.type === "Trailer") ?? videos[0];
  const recommendations = movie?.recommendations?.results ?? [];

  const facts = movie
    ? [
        movie.release_date?.slice(0, 4),
        movie.runtime ? formatRuntime(movie.runtime) : null,
        movie.genres?.map((genre) => genre.name).join(", "),
      ].filter(Boolean)
    : [];

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />

      <div className="relative">
        {movie?.backdrop_path && (
          <div className="absolute inset-0">
            <img
              alt=""
              src={BACKDROP_CDN_URL + movie.backdrop_path}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black" />
          </div>
        )}

        <div className="relative px-6 md:px-16 pt-36 md:pt-28 pb-8">
          <button
            type="button"
            onClick={handleBack}
            className="mb-6 flex items-center gap-2 py-2 px-5 bg-gray-800/80 hover:bg-gray-700 rounded-full font-semibold"
          >
            <FaArrowLeft /> Back
          </button>

          {hasError && (
            <p className="text-red-500 font-semibold">
              Couldn't load this movie. Please try again.
            </p>
          )}

          {!movie && !hasError && <p>Loading...</p>}

          {movie && (
            <div className="flex flex-col md:flex-row gap-8">
              {movie.poster_path && (
                <img
                  alt={movie.title}
                  src={IMG_CDN_URL + movie.poster_path}
                  className="w-48 md:w-72 self-center md:self-start rounded-lg shadow-lg"
                />
              )}

              <div className="flex-1">
                <h1 className="text-3xl md:text-5xl font-bold">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className="mt-2 italic text-gray-400">{movie.tagline}</p>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-4 text-gray-300">
                  {movie.vote_count > 0 && (
                    <span className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      {movie.vote_average.toFixed(1)} / 10
                    </span>
                  )}
                  {facts.map((fact) => (
                    <span key={fact}>{fact}</span>
                  ))}
                </div>

                <h2 className="mt-6 text-xl font-bold">Overview</h2>
                <p className="mt-2 max-w-3xl text-gray-200">
                  {movie.overview || "No overview available."}
                </p>

                {director && (
                  <p className="mt-4">
                    <span className="font-bold">Director: </span>
                    {director.name}
                  </p>
                )}

                {cast.length > 0 && (
                  <>
                    <h2 className="mt-6 text-xl font-bold">Cast</h2>
                    <ul className="mt-2 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl">
                      {cast.map((person) => (
                        <li
                          key={person.credit_id}
                          className="bg-gray-900/80 rounded-lg p-3"
                        >
                          <p className="font-semibold">{person.name}</p>
                          <p className="text-sm text-gray-400">
                            {person.character}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {trailer && (
        <div className="px-6 md:px-16 py-4">
          <h2 className="text-xl md:text-3xl font-bold mb-4">Trailer</h2>
          <iframe
            className="w-full max-w-4xl aspect-video rounded-lg"
            src={"https://www.youtube.com/embed/" + trailer.key}
            title={trailer.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="md:px-10 pb-8">
          <MovieList
            key={movieId}
            title="More Like This"
            movies={recommendations}
          />
        </div>
      )}
    </div>
  );
};

export default MovieDetail;

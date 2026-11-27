import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TMDB_API_URL } from "../config/constants";

// The shape the UI uses. A TMDB id is only unique together with its media type.
const toMovie = (movie) => ({
  id: movie.id,
  mediaType: "movie",
  title: movie.title || movie.original_title,
  overview: movie.overview,
  posterPath: movie.poster_path,
  backdropPath: movie.backdrop_path,
  rating: movie.vote_average,
  releaseDate: movie.release_date,
});

const toMovieList = (response) => response.results.map(toMovie);

// First YouTube trailer, otherwise the first YouTube video of any kind
const pickTrailer = (videos = []) => {
  const youTube = videos.filter((video) => video.site === "YouTube");
  return youTube.find((video) => video.type === "Trailer") ?? youTube[0] ?? null;
};

const toMovieDetails = (movie) => ({
  ...toMovie(movie),
  tagline: movie.tagline,
  runtime: movie.runtime,
  voteCount: movie.vote_count,
  genres: movie.genres ?? [],
  director: movie.credits?.crew?.find((person) => person.job === "Director"),
  cast: movie.credits?.cast?.slice(0, 8) ?? [],
  trailer: pickTrailer(movie.videos?.results),
  recommendations: movie.recommendations?.results?.map(toMovie) ?? [],
});

// The only place that talks to TMDB. Responses are cached per argument.
export const tmdbApi = createApi({
  reducerPath: "tmdb",
  baseQuery: fetchBaseQuery({
    baseUrl: TMDB_API_URL,
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");
      headers.set("Authorization", `Bearer ${import.meta.env.VITE_TMDB_KEY}`);
      return headers;
    },
  }),
  // keep data for 5 minutes so going back to a page does not fetch again
  keepUnusedDataFor: 300,
  endpoints: (build) => ({
    // list: now_playing | popular | top_rated | upcoming
    getMovieList: build.query({
      query: (list) => ({
        url: `movie/${list}`,
        params: { language: "en-US", page: 1 },
      }),
      transformResponse: toMovieList,
    }),
    getMovieTrailer: build.query({
      query: (movieId) => ({
        url: `movie/${movieId}/videos`,
        params: { language: "en-US" },
      }),
      transformResponse: (response) => pickTrailer(response.results),
    }),
    getMovieDetails: build.query({
      query: (movieId) => ({
        url: `movie/${encodeURIComponent(movieId)}`,
        params: {
          language: "en-US",
          append_to_response: "credits,videos,recommendations",
        },
      }),
      transformResponse: toMovieDetails,
    }),
    searchMovies: build.query({
      query: (title) => ({
        url: "search/movie",
        params: {
          query: title,
          include_adult: false,
          language: "en-US",
          page: 1,
        },
      }),
      transformResponse: toMovieList,
    }),
  }),
});

export const {
  useGetMovieListQuery,
  useGetMovieTrailerQuery,
  useGetMovieDetailsQuery,
  useSearchMoviesQuery,
} = tmdbApi;

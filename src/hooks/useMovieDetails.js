import { useEffect, useState } from "react";
import { API_OPTIONS } from "../config/constants";

// Fetches one movie with its cast, videos and recommendations from TMDB
const useMovieDetails = (movieId) => {
  const [result, setResult] = useState({});

  useEffect(() => {
    const controller = new AbortController();

    const getMovieDetails = async () => {
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/" +
            encodeURIComponent(movieId) +
            "?language=en-US&append_to_response=credits,videos,recommendations",
          { ...API_OPTIONS, signal: controller.signal }
        );
        if (!data.ok) throw new Error("TMDB request failed: " + data.status);

        const movie = await data.json();
        setResult({ movieId, movie });
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error(error);
        setResult({ movieId, hasError: true });
      }
    };

    getMovieDetails();

    // cancel the request if the user leaves or opens another movie
    return () => controller.abort();
  }, [movieId]);

  // ignore the previous movie's data while the new one is loading
  const isCurrent = result.movieId === movieId;

  return {
    movie: isCurrent ? result.movie : null,
    hasError: isCurrent && Boolean(result.hasError),
  };
};

export default useMovieDetails;

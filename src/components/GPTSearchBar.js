import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import askGemini from "../utils/gemini";
import { API_OPTIONS } from "../utils/constants";
import { addGPTMovieResults } from "../utils/gptSlice";

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        encodeURIComponent(movie) +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  //Gemini api call and other
  const handleGPTSearch = async () => {
    const query = searchText.current.value.trim();
    if (!query || isLoading) return;

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      query +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    setIsLoading(true);
    setErrorMessage(null);

    try {
      //make an api call
      const reply = await askGemini(gptQuery);

      //got array of movie list from gemini
      const gptMovies = reply
        .split(",")
        .map((movie) => movie.trim())
        .filter(Boolean);

      if (!gptMovies.length) {
        setErrorMessage("No suggestions found. Try a different search.");
        return;
      }

      //for each movie search in TMDB API
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      //addding movies to the store
      dispatch(
        addGPTMovieResults({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.status === 429
          ? "Search limit reached. Please wait a bit and try again."
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="pt-[35%] md:pt-[10%] flex justify-center">
        <form
          className="w-full md:w-1/2 bg-black/70 backdrop-blur-lg p-2 rounded-full flex items-center shadow-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={searchText}
            type="text"
            className="flex-1 p-4 m-2 rounded-full bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="What do you want to search?"
          />
          <button
            className="m-2 py-3 px-6 bg-red-700 hover:bg-red-600 text-white rounded-full font-semibold shadow-md transition-all duration-300 disabled:opacity-50"
            onClick={handleGPTSearch}
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "🔍 Search"}
          </button>
        </form>
      </div>
      {errorMessage && (
        <p className="mt-4 text-center text-red-500 font-semibold">
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default GPTSearchBar;

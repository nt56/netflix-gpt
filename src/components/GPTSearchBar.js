import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import client from "../utils/openAI";
import { API_OPTIONS } from "../utils/constants";
import { addGPTMovieResults } from "../utils/gptSlice";
import Error from "./Error";

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  //GPT api call and other
  const handleGPTSearch = async () => {
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    //make an api call
    const gptResults = await client.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) {
      <Error />;
    }

    //got array of movie list from openai
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    //for each movie search in TMDB API
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    //addding movies to the store
    dispatch(
      addGPTMovieResults({ movieNAmes: gptMovies, movieResults: tmdbResults })
    );
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
            className="m-2 py-3 px-6 bg-red-700 hover:bg-red-600 text-white rounded-full font-semibold shadow-md transition-all duration-300"
            onClick={handleGPTSearch}
          >
            🔍 Search
          </button>
        </form>
      </div>
    </>
  );
};

export default GPTSearchBar;

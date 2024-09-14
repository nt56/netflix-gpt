import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import client from "../utils/openAI";
import { API_OPTIONS } from "../utils/constants";
import { addGPTMovieResults } from "../utils/gptSlice";
import Error from "./Error";

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const langKey = useSelector((store) => store.config.lang);

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
          className="w-full md:w-1/2 bg-black grid grid-cols-12"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={searchText}
            type="text"
            className="p-4 m-4 col-span-9 font-bold"
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <button
            className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg font-bold"
            onClick={handleGPTSearch}
          >
            {lang[langKey].search}
          </button>
        </form>
      </div>
      <div className="flex w-[75%] justify-center items-cente bg-opacity-100">
        <p className="font-bold text-white pl-[30rem] pt-20 text-3xl">
          Upgrade Required: Quota Exceeded Dear User, It looks like you've
          exceeded your current quota. To continue accessing all features
          without interruptions, we encourage you to upgrade to our paid
          version. By upgrading, you'll unlock higher usage limits, premium
          support, and additional benefits tailored to your needs.
        </p>
      </div>
    </>
  );
};

export default GPTSearchBar;

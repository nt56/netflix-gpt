import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import askGemini from "../../services/ai";
import { API_OPTIONS } from "../../config/constants";
import { addGPTMovieResults } from "./aiSlice";
import { HiSparkles } from "react-icons/hi2";
import { FaSearch, FaTimes, FaFire } from "react-icons/fa";

const QUICK_SUGGESTIONS = [
  "Mind-bending Sci-Fi Thrillers",
  "Nostalgic 90s Comedy Classics",
  "High-Octane Action Blockbusters",
  "Spine-Chilling Psychological Horror",
  "Heartwarming Studio Ghibli style",
  "Dark Murder Mysteries with Twist Endings",
];

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          encodeURIComponent(movie) +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );
      const json = await data.json();
      return json.results || [];
    } catch (err) {
      console.error("TMDB error:", err);
      return [];
    }
  };

  const executeSearch = async (queryText) => {
    const query = queryText.trim();
    if (!query || isLoading) return;

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      query +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const reply = await askGemini(gptQuery);

      const gptMovies = reply
        .split(",")
        .map((movie) => movie.trim())
        .filter(Boolean);

      if (!gptMovies.length) {
        setErrorMessage("No suggestions found. Try a different search.");
        return;
      }

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(
        addGPTMovieResults({
          movieNames: gptMovies,
          movieResults: tmdbResults,
        })
      );
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.status === 429
          ? "AI search rate limit reached. Please wait a minute and try again."
          : "Could not fetch AI recommendations right now. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    executeSearch(inputValue);
  };

  const handleChipClick = (suggestion) => {
    setInputValue(suggestion);
    if (searchText.current) {
      searchText.current.value = suggestion;
    }
    executeSearch(suggestion);
  };

  const handleClear = () => {
    setInputValue("");
    if (searchText.current) {
      searchText.current.value = "";
      searchText.current.focus();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      {/* Title & AI Branding Header */}
      <div className="text-center mb-8 animate-fadeInDown">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-900/60 to-brand/30 border border-purple-500/30 text-purple-200 text-xs font-semibold uppercase tracking-wider mb-3 shadow-glow-purple">
          <HiSparkles className="text-yellow-300 text-sm animate-pulse" />
          <span>Gemini AI Movie Recommender</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
          What are you in the mood to watch?
        </h1>
        <p className="text-gray-400 text-xs sm:text-base mt-2 max-w-xl mx-auto">
          Describe any vibe, plot, genre, or combination, and our AI will curate
          the perfect cinematic lineup for you.
        </p>
      </div>

      {/* Main Search Bar Form */}
      <form
        onSubmit={handleFormSubmit}
        className="glass-panel p-2 sm:p-2.5 rounded-2xl sm:rounded-full border border-white/15 shadow-2xl flex flex-col sm:flex-row items-center gap-2 transition-all duration-300 focus-within:border-brand/70 focus-within:shadow-glow"
      >
        <div className="relative flex-1 flex items-center w-full px-3">
          <FaSearch className="text-gray-400 text-base shrink-0 mr-3" />
          <input
            ref={searchText}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full py-3 bg-transparent text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none"
            placeholder="e.g. Retro cyberpunk detective movies with rain..."
          />
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-gray-400 hover:text-white transition-colors"
              aria-label="Clear input"
            >
              <FaTimes className="text-sm" />
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="w-full sm:w-auto py-3.5 px-8 rounded-xl sm:rounded-full bg-gradient-to-r from-red-600 via-brand to-purple-600 text-white font-extrabold text-sm tracking-wide shadow-glow hover:shadow-glow-purple transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 shrink-0"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Thinking...</span>
            </>
          ) : (
            <>
              <HiSparkles className="text-base text-yellow-300" />
              <span>Ask AI</span>
            </>
          )}
        </button>
      </form>

      {/* Quick Suggestion Chips */}
      <div className="mt-5">
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-gray-400">
          <FaFire className="text-brand text-xs" />
          <span>Popular Prompts:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {QUICK_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleChipClick(suggestion)}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-dark-850/80 hover:bg-dark-700 text-gray-300 hover:text-white border border-white/10 hover:border-purple-500/50 transition-all duration-200 hover:scale-105"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-6 p-4 rounded-2xl bg-red-950/70 border border-red-500/40 text-red-200 text-sm text-center animate-fadeIn max-w-lg mx-auto">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default GPTSearchBar;

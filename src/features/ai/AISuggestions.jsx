import Row from "../../components/Row";
import { useSearchMoviesQuery } from "../../services/tmdb";
import { useSelector } from "react-redux";
import { HiSparkles } from "react-icons/hi2";
import { FaFilm, FaBrain, FaBolt } from "react-icons/fa";

// TMDB matches for one movie name suggested by the AI
const SuggestionRow = ({ name }) => {
  const { currentData, isError, refetch } = useSearchMoviesQuery(name);

  return (
    <Row
      title={name}
      icon={<HiSparkles className="text-yellow-400" />}
      items={currentData}
      isError={isError}
      onRetry={refetch}
      emptyMessage="No match found on TMDB."
    />
  );
};

const AISuggestions = () => {
  const movieNames = useSelector((store) => store.ai.movieNames);

  if (!movieNames) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-16 animate-fadeIn">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-200">
            How Flixora AI Works
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Supercharged by Google Gemini & TMDB Cinema Engine
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center text-lg mb-4">
              <FaBrain />
            </div>
            <h3 className="text-white font-bold text-base mb-1">
              Natural Language Prompts
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Describe moods, memories, or twists like "movies where the villain wins" or "nostalgic coming-of-age road trips".
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-brand/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-brand/20 text-brand flex items-center justify-center text-lg mb-4">
              <FaFilm />
            </div>
            <h3 className="text-white font-bold text-base mb-1">
              Live Cinema Catalog
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Instantly matches AI suggestions with TMDB high-definition posters, ratings, cast lineups, and trailers.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-blue-500/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center text-lg mb-4">
              <FaBolt />
            </div>
            <h3 className="text-white font-bold text-base mb-1">
              Interactive Previews
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Explore trailers, runtime facts, directorial credits, and related recommendations with a single click.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 max-w-7xl mx-auto px-2 sm:px-4 animate-fadeIn">
      {/* Results Header */}
      <div className="mb-6 px-4 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-brand/20 text-brand text-lg">
            <HiSparkles />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              AI Curated Selections
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Found {movieNames.length} custom recommendations based on your query
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Movie Lists */}
      <div className="space-y-6">
        {movieNames.map((name) => (
          <SuggestionRow key={name} name={name} />
        ))}
      </div>
    </div>
  );
};

export default AISuggestions;

import HeroBackground from "./HeroBackground";
import HeroDetails from "./HeroDetails";
import ErrorState from "../../components/ErrorState";
import { useGetMovieListQuery } from "../../services/tmdb";
import { HERO_LIST } from "../../config/browseRows";

const HeroBanner = () => {
  const { data: movies, isError, refetch } = useGetMovieListQuery(HERO_LIST);
  const movie = movies?.[0];

  if (!movie) {
    return (
      <div className="relative w-full aspect-[16/9] min-h-[18rem] max-h-[85vh] bg-dark-950 flex items-center justify-center px-4 pt-20">
        {isError ? (
          <ErrorState
            message="Could not load the featured movie."
            onRetry={refetch}
          />
        ) : movies ? (
          <p className="text-sm text-gray-400">No featured movie right now.</p>
        ) : (
          <div role="status" className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin" />
            <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
              Loading Premiere...
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full bg-dark-950 overflow-hidden">
      <HeroDetails movie={movie} />
      <HeroBackground movie={movie} />
    </div>
  );
};

export default HeroBanner;

import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Card, { CARD_WIDTH } from "./Card";
import Skeleton from "./Skeleton";
import ErrorState from "./ErrorState";

const ARROW_CLASS =
  "hidden md:flex absolute top-1/2 -translate-y-1/2 z-30 w-11 h-11 items-center justify-center rounded-full glass-panel bg-dark-900/90 text-white hover:bg-brand hover:scale-110 active:scale-95 transition-all duration-200 opacity-0 group-hover/row:opacity-100 focus-visible:opacity-100 shadow-2xl border border-white/20";

// Horizontally scrolling line of titles.
// While "items" is undefined it shows a loading or error state.
const Row = ({
  id,
  title,
  subtitle,
  icon,
  items,
  isError = false,
  onRetry,
  emptyMessage = "Nothing to show here yet.",
}) => {
  const rowRef = useRef(null);

  const scrollRow = (direction) => {
    const row = rowRef.current;
    if (row) {
      row.scrollBy({
        left: direction * row.clientWidth * 0.75,
        behavior: "smooth",
      });
    }
  };

  const visibleItems = items?.filter((item) => item.posterPath);

  const renderContent = () => {
    if (!visibleItems) {
      if (isError) {
        return (
          <div className="py-4">
            <ErrorState message={`Could not load ${title}.`} onRetry={onRetry} />
          </div>
        );
      }

      return (
        <div
          role="status"
          className="flex overflow-hidden gap-3 sm:gap-4 md:gap-5 py-4 px-1"
        >
          <span className="sr-only">Loading {title}</span>
          {Array.from({ length: 8 }, (_, index) => (
            <Skeleton
              key={index}
              className={`${CARD_WIDTH} aspect-[2/3] rounded-2xl`}
            />
          ))}
        </div>
      );
    }

    if (visibleItems.length === 0) {
      return <p className="py-4 px-1 text-sm text-gray-400">{emptyMessage}</p>;
    }

    return (
      <div className="relative group/list">
        {/* Left Arrow Button */}
        <button
          type="button"
          aria-label={`Scroll ${title} left`}
          onClick={() => scrollRow(-1)}
          className={`${ARROW_CLASS} -left-4 lg:-left-6`}
        >
          <FaChevronLeft className="text-sm" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={rowRef}
          className="flex overflow-x-auto no-scrollbar scroll-smooth gap-3 sm:gap-4 md:gap-5 py-4 px-1"
        >
          {visibleItems.map((item) => (
            <Card key={`${item.mediaType}_${item.id}`} item={item} />
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          aria-label={`Scroll ${title} right`}
          onClick={() => scrollRow(1)}
          className={`${ARROW_CLASS} -right-4 lg:-right-6`}
        >
          <FaChevronRight className="text-sm" />
        </button>
      </div>
    );
  };

  return (
    <div id={id} className="px-4 sm:px-8 md:px-14 py-2 group/row">
      {/* Category Header */}
      <div className="flex items-end justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-6 rounded-full bg-brand hidden sm:block" />
          <div>
            <div className="flex items-center gap-2">
              {icon && <span className="text-sm sm:text-base">{icon}</span>}
              <h2 className="text-lg sm:text-2xl font-bold font-display text-white tracking-tight">
                {title}
              </h2>
              {visibleItems?.length > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400 font-medium">
                  {visibleItems.length}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-gray-400 hidden md:block mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default Row;

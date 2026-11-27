import Row from "../../components/Row";
import { useGetMovieListQuery } from "../../services/tmdb";
import { BROWSE_ROWS, HERO_LIST } from "../../config/browseRows";

const BrowseRow = ({ list, anchor, title, subtitle, Icon, iconClass }) => {
  const { data, isError, refetch } = useGetMovieListQuery(list);

  return (
    <Row
      id={anchor}
      title={title}
      subtitle={subtitle}
      icon={<Icon className={iconClass} />}
      items={data}
      isError={isError}
      onRetry={refetch}
    />
  );
};

const BrowseRows = () => {
  const { data: heroMovies } = useGetMovieListQuery(HERO_LIST);

  // rows overlap the hero trailer, but only when there is one to overlap
  const overlap = heroMovies?.length
    ? "-mt-16 sm:-mt-24 md:-mt-44 lg:-mt-52"
    : "pt-4";

  return (
    <div className="bg-dark-950 w-full relative z-20 pb-16">
      <div className={`${overlap} relative z-30 space-y-6 sm:space-y-8`}>
        {BROWSE_ROWS.map((row) => (
          <BrowseRow key={row.list} {...row} />
        ))}
      </div>
    </div>
  );
};

export default BrowseRows;

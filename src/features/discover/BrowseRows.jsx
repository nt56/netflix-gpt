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

  // on large screens the rows overlap the bottom of the hero, when there is one
  const overlap = heroMovies?.length ? "lg:-mt-24" : "pt-4";

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

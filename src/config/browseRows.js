import { FaCalendarAlt, FaFilm, FaFire, FaStar } from "react-icons/fa";

// Rows on the browse page. "list" is the TMDB movie list to show.
// "anchor" is the element id the header links scroll to.
export const BROWSE_ROWS = [
  {
    list: "now_playing",
    title: "Trending Now",
    subtitle: "Critically acclaimed movies streaming this week",
    Icon: FaFire,
    iconClass: "text-brand",
  },
  {
    list: "top_rated",
    anchor: "movies-section",
    title: "Top Rated Classics & Hits",
    subtitle: "Highest rated movies voted by global audiences",
    Icon: FaStar,
    iconClass: "text-yellow-400",
  },
  {
    list: "popular",
    title: "Popular on Flixora",
    subtitle: "Most watched titles across all genres",
    Icon: FaFilm,
    iconClass: "text-blue-400",
  },
  {
    list: "upcoming",
    anchor: "upcoming-section",
    title: "Upcoming Blockbusters",
    subtitle: "Premieres coming soon to your screen",
    Icon: FaCalendarAlt,
    iconClass: "text-purple-400",
  },
];

// The first movie of this list is the hero banner
export const HERO_LIST = "now_playing";

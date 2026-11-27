import { FaCalendarAlt, FaFilm, FaFire, FaStar } from "react-icons/fa";

// Rows on the browse page. "list" is the TMDB movie list to show.
// "anchor" is the element id the header links scroll to.
export const BROWSE_ROWS = [
  {
    list: "now_playing",
    title: "Now Playing",
    subtitle: "Movies in theatres now",
    Icon: FaFire,
    iconClass: "text-brand",
  },
  {
    list: "top_rated",
    anchor: "movies-section",
    title: "Top Rated Classics & Hits",
    subtitle: "Highest rated movies on TMDB",
    Icon: FaStar,
    iconClass: "text-yellow-400",
  },
  {
    list: "popular",
    title: "Popular Movies",
    subtitle: "Popular on TMDB right now",
    Icon: FaFilm,
    iconClass: "text-blue-400",
  },
  {
    list: "upcoming",
    anchor: "upcoming-section",
    title: "Upcoming Movies",
    subtitle: "Coming soon to theatres",
    Icon: FaCalendarAlt,
    iconClass: "text-purple-400",
  },
];

// The first movie of this list is the hero banner
export const HERO_LIST = "now_playing";

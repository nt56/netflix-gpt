import React from "react";
import { Link } from "react-router-dom";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ movieId, title, posterPath }) => {
  if (!posterPath) return null;

  return (
    <Link
      to={"/movie/" + movieId}
      className="block w-32 md:w-44 shrink-0 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
    >
      <img
        alt={title}
        src={IMG_CDN_URL + posterPath}
        className="rounded-lg"
      />
    </Link>
  );
};

export default MovieCard;

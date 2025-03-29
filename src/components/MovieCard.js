import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div className="w-36 md:w-48 pr-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
      <img
        alt="movie-poster"
        src={IMG_CDN_URL + posterPath}
        className="rounded-lg"
      />
    </div>
  );
};

export default MovieCard;

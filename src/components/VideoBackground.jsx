import React from "react";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";
import { BACKDROP_CDN_URL } from "../utils/constants";

const VideoBackground = ({ movieId, fallbackBackdrop }) => {
  useMovieTrailer(movieId);

  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  return (
    <div className="relative w-full aspect-[16/9] max-h-[88vh] overflow-hidden bg-dark-950 select-none">
      {trailerVideo?.key ? (
        <div className="w-full h-full relative pointer-events-none">
          <iframe
            className="w-full h-full scale-[1.3] md:scale-[1.25] origin-center opacity-90 transition-opacity duration-1000"
            src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${trailerVideo.key}&modestbranding=1&enablejsapi=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </div>
      ) : fallbackBackdrop ? (
        <img
          src={BACKDROP_CDN_URL + fallbackBackdrop}
          alt="Featured preview"
          className="w-full h-full object-cover filter brightness-75 scale-105 transition-transform duration-1000 ease-out"
        />
      ) : (
        <div className="w-full h-full bg-dark-900 shimmer-bg" />
      )}

      {/* Cinematic Gradient Overlays for seamless transition into movie rows */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/30 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-950/80 via-transparent to-dark-950/30 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950/70 via-transparent to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default VideoBackground;

import { API_OPTIONS } from "../config/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../features/discover/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  //fetch trailer video
  useEffect(() => {
    const getMovieVideo = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          movieId +
          "/videos?language=en-US",
        API_OPTIONS
      );
      const json = await data.json();

      //filtering the trailer only
      const videoData = json.results.filter((video) => video.type === "Trailer");
      const trailer = videoData.length ? videoData[0] : json.results[0]; //some movies has more than one trailer so i take first and if no trailer then show first clip by default
      dispatch(addTrailerVideo(trailer));
    };

    !trailerVideo && getMovieVideo();
  }, [trailerVideo, movieId, dispatch]);
};

export default useMovieTrailer;

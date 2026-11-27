import { API_OPTIONS } from "../config/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../features/discover/moviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  //Fetch data from TMDB API and update store
  const dispatch = useDispatch();

  //if data is already in store do not call api again
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  useEffect(() => {
    const getNowPlayingMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addNowPlayingMovies(json.results));
    };

    !nowPlayingMovies && getNowPlayingMovies();
  }, [nowPlayingMovies, dispatch]);
};

export default useNowPlayingMovies;

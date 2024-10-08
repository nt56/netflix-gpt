import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieNames: null,
    movieResults: null,
  },
  reducers: {
    toggelGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGPTMovieResults: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
  },
});

export const { toggelGptSearchView, addGPTMovieResults } = gptSlice.actions;
export default gptSlice.reducer;

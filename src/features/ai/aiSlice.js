import { createSlice } from "@reduxjs/toolkit";
import { removeUser } from "../auth/authSlice";

const initialState = {
  showGptSearch: false,
  movieNames: null,
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    toggelGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGPTMovieResults: (state, action) => {
      state.movieNames = action.payload;
    },
  },
  // the next user must not see the previous user's AI results
  extraReducers: (builder) => {
    builder.addCase(removeUser, () => initialState);
  },
});

export const { toggelGptSearchView, addGPTMovieResults } = aiSlice.actions;
export default aiSlice.reducer;

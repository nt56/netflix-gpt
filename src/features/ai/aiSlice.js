import { createSlice } from "@reduxjs/toolkit";
import { removeUser } from "../auth/authSlice";

const initialState = {
  showAiSearch: false,
  movieNames: null,
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    toggleAiSearch: (state) => {
      state.showAiSearch = !state.showAiSearch;
    },
    setAiSuggestions: (state, action) => {
      state.movieNames = action.payload;
    },
  },
  // the next user must not see the previous user's AI results
  extraReducers: (builder) => {
    builder.addCase(removeUser, () => initialState);
  },
});

export const { toggleAiSearch, setAiSuggestions } = aiSlice.actions;
export default aiSlice.reducer;

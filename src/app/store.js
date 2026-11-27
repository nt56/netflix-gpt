import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/authSlice";
import moviesReducer from "../features/discover/moviesSlice";
import gptReducer from "../features/ai/aiSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: gptReducer,
  },
});

export default appStore;

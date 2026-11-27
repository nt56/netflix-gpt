import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import moviesReducer from "../features/discover/moviesSlice";
import aiReducer from "../features/ai/aiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    ai: aiReducer,
  },
});

export default store;

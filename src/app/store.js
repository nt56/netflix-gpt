import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import aiReducer from "../features/ai/aiSlice";
import { tmdbApi } from "../services/tmdb";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ai: aiReducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

export default store;

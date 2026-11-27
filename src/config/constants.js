export const BG_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/dae1f45f-c2c5-4a62-8d58-6e1b0c6b2d8e/6d1fb8a4-5844-42a4-9b01-1c6c128acf19/IN-en-20240827-TRIFECTA-perspective_WEB_c292a608-cdc6-4686-8dc8-405bfcf753af_large.jpg";

export const USER_AVATAR =
  "https://cdn-icons-png.flaticon.com/128/924/924915.png";

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const BACKDROP_CDN_URL = "https://image.tmdb.org/t/p/w1280";

export const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY;

export const GEMINI_MODEL = "gemini-3.5-flash-lite";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + import.meta.env.VITE_TMDB_KEY,
  },
};

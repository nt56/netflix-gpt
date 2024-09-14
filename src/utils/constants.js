export const BG_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/dae1f45f-c2c5-4a62-8d58-6e1b0c6b2d8e/6d1fb8a4-5844-42a4-9b01-1c6c128acf19/IN-en-20240827-TRIFECTA-perspective_WEB_c292a608-cdc6-4686-8dc8-405bfcf753af_large.jpg";

export const LOGO =
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const USER_AVATAR =
  "https://cdn-icons-png.flaticon.com/128/924/924915.png";

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer" + process.env.REACT_APP_TMDB_KEY,
  },
};

export const SUPPORTED_LANGUAGES = [
  { identifire: "english", name: "English" },
  { identifire: "hindi", name: "Hindi" },
  { identifire: "marathi", name: "Marathi" },
  { identifire: "spanish", name: "Spanish" },
  { identifire: "japnees", name: "Japnees" },
];

# Netflix GPT

# Steps

- create react-app
- configure tailwind
- Header
- Routing of App
- Login Form
- Sign up Form
- Form Validation
- useRef Hook
- Firebase Setup
- Deploying our app to production
- Create SignUp User Account
- Implement Sign In user Api
- Created Redux Store with userSlice
- Implemented Sign out
- Update Profile
- BugFix: Sign up user displayName and profile picture update
- BugFix: if the user is not logged in Redirect /browse to Login Page and vice-versa
- Unsubscibed to the onAuthStateChanged callback
- Add hardcoded values to the constants file
- Regiter TMDB API & create an app & get access token
- Get Data from TMDB now playing movies list API
- Custom Hook for Now Playing Movies
- Create movieSlice
- Update Store with movies Data
- Planning for MainContauiner & secondary container
- Fetch Data for Trailer Video
- Update Store with Trailer Video Data
- Embedded the Yotube video and make it autoplay and mute
- Tailwind Classes to make Main Container look awesome
- Build Secondary Component
- Build Movie List
- build Movie Card
- TMDB Image CDN URL
- Made the Browsre page amazing with Tailwind CSS
- usePopularMovies Custom hook
- GPT Search Page
- GPT Search Bar
- (BONUS) Multi-language Feature in our App)
- Get Open AI Api Key
- Gpt Search API Call
- fetched gptMoviesSuggestions from TMDB
- created gptSlice added data
- Resused Movie List component to make movie suggestion container
- Memoization
- Added .env file
- Adding .env file to gitignore
- Made our Site Responsive

# steps for deploy project on firebase

- Install firebase CLI cmd
- Firebase Login cmd
- Initialise Firebase cmd
- Deploy cmd


# Features

- Login/Sign Up
    - Sign In /Sign up Form
    - redirect to Browse Page
- Browse (after authentication)
    - Header
    - Main Movie
        - Tailer in Background
        - Title & Description
        - MovieSuggestions
            - MovieLists * N
- NetflixGPT
    - Search Bar
    - Movie Suggestions

# Tech Stack

- React: Frontend framework for building user interfaces.
- TMDB: Movie database for fetching movie details.
- Firebase: Authentication and hosting platform.
- OpenAI: Movie recommendation engine.
- Specialized Movie Suggestions
- To enable specialized movie suggestions, obtain your OpenAI key and enter it in the designated section of the application.

# Contribute

If you'd like to contribute to this project, have suggestions for improvement, or wish to add more features, please feel free to submit issues or pull requests on GitHub. Your contributions are valued! 🚀

Thank you for exploring Netflix GPT. We hope it enhances your movie-watching experience!
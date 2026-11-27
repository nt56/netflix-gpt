import React, { useRef, useState } from "react";
import Logo from "../../components/Logo";
import { BG_URL, USER_AVATAR } from "../../config/constants";
import { checkValidData } from "./validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../services/firebase";
import { useDispatch } from "react-redux";
import { addUser, toProfile } from "./authSlice";
import { FaEye, FaEyeSlash, FaLock, FaUser, FaEnvelope, FaExclamationCircle } from "react-icons/fa";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const name = useRef(null);
  const email = useRef(null);
  const passwordRef = useRef(null);

  const dispatch = useDispatch();

  const handleButtonClick = async () => {
    const emailVal = email.current?.value || "";
    const passVal = passwordRef.current?.value || "";

    const message = checkValidData(emailVal, passVal);
    setErrorMessage(message);
    if (message) return;

    setIsLoading(true);

    if (!isSignInForm) {
      // read the name now: creating the account leaves this page
      const nameVal = name.current?.value || "Flixora Viewer";

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          emailVal,
          passVal
        );
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: nameVal,
          photoURL: USER_AVATAR,
        });

        // the auth listener fired before the name was saved, so update the store
        dispatch(addUser(toProfile(auth.currentUser)));
      } catch (error) {
        setErrorMessage(
          error.code
            ? error.code.replace("auth/", "").replace(/-/g, " ")
            : error.message
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, emailVal, passVal);
      } catch (error) {
        setErrorMessage(
          error.code
            ? error.code.replace("auth/", "").replace(/-/g, " ")
            : error.message
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between overflow-hidden bg-dark-950 font-sans">
      {/* Cinematic Background Backdrop */}
      <div className="fixed inset-0 z-0">
        <img
          src={BG_URL}
          alt=""
          className="h-full w-full object-cover scale-105 filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/70 to-dark-950/40" />
        <div className="absolute inset-0 bg-cinema-vignette opacity-80" />
      </div>

      {/* Center Auth Card */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-28 sm:py-32">
        <div className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl animate-fadeInUp">
          {/* Brand Header */}
          <div className="text-center mb-8 flex flex-col items-center">
            <Logo size="lg" className="mb-4" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {isSignInForm ? "Welcome Back" : "Create Your Account"}
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-1.5">
              {isSignInForm
                ? "Sign in to watch trailers & explore AI recommendations"
                : "Join Flixora for personalized AI cinema discovery"}
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {!isSignInForm && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300 ml-1">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <FaUser className="absolute left-4 text-gray-400 text-sm" />
                  <input
                    ref={name}
                    type="text"
                    placeholder="Enter your name"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl glass-input text-white placeholder-gray-500 text-sm focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 ml-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <FaEnvelope className="absolute left-4 text-gray-400 text-sm" />
                <input
                  ref={email}
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl glass-input text-white placeholder-gray-500 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 ml-1">
                Password
              </label>
              <div className="relative flex items-center">
                <FaLock className="absolute left-4 text-gray-400 text-sm" />
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl glass-input text-white placeholder-gray-500 text-sm focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-gray-400 hover:text-white transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-base" />
                  ) : (
                    <FaEye className="text-base" />
                  )}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs animate-fadeIn">
                <FaExclamationCircle className="text-red-400 shrink-0 text-sm" />
                <span className="capitalize">{errorMessage}</span>
              </div>
            )}

            <button
              onClick={handleButtonClick}
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-purple-600 hover:to-violet-600 transition-all duration-300 shadow-glow hover:shadow-glow-lg active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>{isSignInForm ? "Sign In" : "Get Started"}</span>
              )}
            </button>
          </form>

          {/* Switch mode */}
          <div className="mt-6 text-center text-xs text-gray-400">
            {isSignInForm ? "New to Flixora? " : "Already have an account? "}
            <button
              onClick={toggleSignInForm}
              className="font-bold text-white hover:text-brand-hover transition-colors underline-offset-2 hover:underline ml-1"
            >
              {isSignInForm ? "Sign up now" : "Sign in here"}
            </button>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <footer className="relative z-10 py-6 text-center text-xs text-gray-500 border-t border-white/5">
        <p>© 2026 Flixora. AI cinema recommendations powered by Gemini & TMDB.</p>
      </footer>
    </div>
  );
};

export default Login;

import { useEffect, useState, useRef } from "react";
import Logo from "./Logo";
import { useToast } from "./toast/toastContext";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { toggleAiSearch } from "../features/ai/aiSlice";
import { HiSparkles } from "react-icons/hi2";
import { FaHome, FaChevronDown } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const showToast = useToast();

  const user = useSelector(selectUser);
  const showAiSearch = useSelector((store) => store.ai.showAiSearch);

  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Dynamic header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setShowDropdown(false);
      })
      .catch((error) => {
        console.error(error);
        showToast("Could not sign out. Please try again.", "error");
      });
  };

  const handleAiSearchClick = () => {
    dispatch(toggleAiSearch());
    if (location.pathname !== "/browse") {
      navigate("/browse");
    }
  };

  const handleLogoClick = () => {
    if (user) {
      if (showAiSearch) dispatch(toggleAiSearch());
      navigate("/browse");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 sm:px-8 md:px-14 ${
        isScrolled
          ? "bg-dark-950/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl"
          : "bg-gradient-to-b from-black/95 via-black/50 to-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Navigation */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleLogoClick}
            aria-label="Flixora home"
            className="cursor-pointer group transition-transform duration-300 hover:scale-105"
          >
            <Logo size="md" />
          </button>

          {/* Quick nav links for desktop when signed in and on browse */}
          {user && location.pathname === "/browse" && (
            <nav className="hidden lg:flex items-center gap-6 ml-6 text-sm font-medium text-gray-300">
              <button
                onClick={() => {
                  if (showAiSearch) dispatch(toggleAiSearch());
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`transition-colors duration-200 hover:text-white ${
                  !showAiSearch ? "text-white font-semibold" : "text-gray-400"
                }`}
              >
                Browse
              </button>
              <button
                onClick={() => {
                  if (showAiSearch) dispatch(toggleAiSearch());
                  const el = document.getElementById("movies-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="transition-colors duration-200 hover:text-white text-gray-400"
              >
                Top Rated
              </button>
              <button
                onClick={() => {
                  if (showAiSearch) dispatch(toggleAiSearch());
                  const el = document.getElementById("upcoming-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="transition-colors duration-200 hover:text-white text-gray-400"
              >
                Upcoming
              </button>
            </nav>
          )}
        </div>

        {/* User controls */}
        {user && (
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* AI Search Toggle Button */}
            <button
              onClick={handleAiSearchClick}
              className={`group relative flex items-center gap-2 whitespace-nowrap px-3.5 sm:px-5 py-2 rounded-full font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-lg ${
                showAiSearch
                  ? "bg-dark-800 text-white border border-white/20 hover:bg-dark-700"
                  : "bg-gradient-to-r from-red-600 via-rose-600 to-purple-600 text-white hover:shadow-glow-purple hover:scale-105 active:scale-95"
              }`}
            >
              {showAiSearch ? (
                <>
                  <FaHome className="text-base text-brand transition-transform group-hover:scale-110" />
                  <span>Home</span>
                </>
              ) : (
                <>
                  <HiSparkles className="text-base text-yellow-300 animate-pulse group-hover:rotate-12 transition-transform" />
                  <span className="font-bold">AI Search</span>
                </>
              )}
            </button>

            {/* User Profile Pill & Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 p-1 pl-1.5 sm:pr-2.5 rounded-full bg-dark-850/80 hover:bg-dark-750 border border-white/10 transition-all duration-200 focus:outline-none"
                aria-label="User profile menu"
              >
                <img
                  alt="user avatar"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-brand/60"
                  src={
                    user?.photoURL ||
                    "https://cdn-icons-png.flaticon.com/128/924/924915.png"
                  }
                />
                <span className="hidden md:inline-block text-xs font-semibold text-gray-200 max-w-[100px] truncate">
                  {user?.displayName || "Flixora Member"}
                </span>
                <FaChevronDown
                  className={`text-[10px] text-gray-400 transition-transform duration-300 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-dropdown border border-white/15 p-2 shadow-2xl animate-scaleIn z-50">
                  <div className="px-3 py-2.5 border-b border-white/10">
                    <p className="text-xs text-gray-400">Signed in as</p>
                    <p className="text-sm font-bold text-white truncate">
                      {user?.displayName || "Flixora Member"}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">
                      {user?.email}
                    </p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={handleAiSearchClick}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                      <HiSparkles className="text-purple-400 text-sm" />
                      <span>{showAiSearch ? "Back to Browse" : "AI Movie Recommender"}</span>
                    </button>

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors mt-1"
                    >
                      <FiLogOut className="text-sm" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

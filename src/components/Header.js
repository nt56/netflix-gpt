import React, { useEffect } from "react";
import { LOGO } from "../utils/constants";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggelGptSearchView } from "../utils/gptSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        alert(error);
        navigate("/error");
      });
  };

  //whenever user sign in or sign up execute this
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in then add details to store
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out then remove user from the store
        dispatch(removeUser());
        navigate("/");
      }

      //when header component is unloads it will unsubscribe to this event
      return () => unsubscribe();
    });
  }, [dispatch, navigate]);

  const handleGPTSearchClick = () => {
    dispatch(toggelGptSearchView());
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img src={LOGO} alt="logo" className="w-44 mx-auto md:mx-0" />

      {user && (
        <div className="flex items-center gap-4">
          <button
            className="py-2 px-6 flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300"
            onClick={handleGPTSearchClick}
          >
            {showGptSearch ? "🏠 Home" : "🤖 GPT Search"}
          </button>

          <button
            className="flex items-center gap-2 bg-gray-800 text-white font-semibold rounded-full shadow-md px-4 py-2 hover:bg-red-600 transition-all duration-300"
            onClick={handleSignOut}
          >
            <img
              alt="user-icon"
              className="w-8 h-8 rounded-full border-2 border-white"
              src={user?.photoURL}
            />
            <span>🚪 Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

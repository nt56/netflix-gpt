import React, { useRef, useState } from "react";
import Header from "./Header";
import { BG_URL, USER_AVATAR } from "../utils/constants";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [password, setPassword] = useState(true);

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const Password = useRef(null);

  const handleButtonClick = () => {
    //form data validation
    const message = checkValidData(email.current.value, Password.current.value);
    setErrorMessage(message);
    if (message) return; //if it has error then it return don't go ahead

    //Sign In or Sign Up Operation Logic
    if (!isSignInForm) {
      //Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        Password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              // Profile updated! and add user info again here
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    } else {
      //Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        Password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
  };

  const toggelSignInFrom = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleHideShow = () => {
    setPassword(!password);
  };

  return (
    <div className="w-screen">
      <Header />

      <div className="absolute">
        <img
          src={BG_URL}
          alt="bg-img"
          className="h-screen w-screen object-cover"
        />
      </div>

      <form
        className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-3xl py-3">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Name"
            required
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email"
          required
          className="p-4 my-4 w-full bg-gray-700"
        />
        <div className="flex justify-between items-center w-full bg-gray-700 my-4 relative">
          <input
            ref={Password}
            type={password ? "password" : "text"}
            placeholder="Password"
            required
            className="p-4 h-fit w-full bg-gray-700"
          />
          <div
            className="cursor-pointer absolute ml-[22rem] text-xl"
            onClick={handleHideShow}
          >
            {password ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
        <p className="text-white font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer font-bold" onClick={toggelSignInFrom}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registerd? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;

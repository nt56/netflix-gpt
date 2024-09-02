import React, { useState } from "react";
import Header from "./Header";
import { BG_URL } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggelSignInFrom = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />

      <div className="absolute">
        <img src={BG_URL} alt="bg-img" />
      </div>

      <form className="w-full md:w-3/12 absolute p-12 bg-black my-60 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-3">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Name"
            required
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          type="text"
          placeholder="Email"
          required
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          type="text"
          placeholder="Password"
          required
          className="p-4 my-4 w-full bg-gray-700"
        />
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggelSignInFrom}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registerd? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;

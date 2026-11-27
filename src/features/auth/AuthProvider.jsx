import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";
import { addUser, removeUser, toProfile } from "./authSlice";

// The only auth listener in the app. Route guards react to the state it sets.
const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      dispatch(user ? addUser(toProfile(user)) : removeUser());
    });
  }, [dispatch]);

  return children;
};

export default AuthProvider;

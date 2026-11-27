import { createSlice } from "@reduxjs/toolkit";

// status is "loading" until Firebase reports whether someone is signed in
const authSlice = createSlice({
  name: "auth",
  initialState: { status: "loading", user: null },
  reducers: {
    addUser: (state, action) => {
      state.status = "signedIn";
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.status = "signedOut";
      state.user = null;
    },
  },
});

// Keeps only the plain, serialisable fields of a Firebase user
export const toProfile = ({ uid, email, displayName, photoURL }) => ({
  uid,
  email,
  displayName,
  photoURL,
});

export const selectUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;

export const { addUser, removeUser } = authSlice.actions;
export default authSlice.reducer;

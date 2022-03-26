/**
 * @fileoverview This file is the central storage to hold "states" of our application
 */
import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../backend/firebase";

// --------------- States -------------------
const initialState = {
  userToken: null,
  userEmail: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  // --------------- Reducers -------------------
  reducers: {
    saveUser: (state, action) => {
      // Extract user token from action
      state.userToken = action.payload;

      // Extract user email to the 'state' so that it can be accessed from anywhere (NOT coming from action)
      state.userEmail = auth.currentUser?.email;
    },
  },
});

// --------------- Actions -------------------
export const { saveUser } = authSlice.actions;

export default authSlice.reducer;

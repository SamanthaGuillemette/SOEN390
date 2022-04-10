import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../backend/firebase";

// --------------- States -------------------
const initialState = {
  userInfoDetails: null,
  clientInfoDetails: null,
};

/**
 * Fetch (& save) basic info of the current logged in user
 * @param {string} userEmail
 */
export const fetchUserInfo = createAsyncThunk(
  "userInfo/fetchUserInfo",
  async (userEmail) => {
    const responseData = await getDoc(doc(db, `Admin/${userEmail}`));

    if (responseData) {
      return responseData.data();
    } else {
      console.log("User info does not exist");
      return initialState;
    }
  }
);

/**
 * Fetch (& save) client info based on client email
 * @param {string} clientEmail
 */
export const fetchClientInfo = createAsyncThunk(
  "userInfo/fetchClientInfo",
  async (clientEmail) => {
    const responseData = await getDoc(doc(db, `Client/${clientEmail}`));

    if (responseData) {
      return responseData.data();
    } else {
      console.log("Client info does not exist");
      return initialState;
    }
  }
);

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,

  // --------------- Reducers -------------------
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.userInfoDetails = action.payload;
    });
  },
});

// --------------- Selectors -------------------
export const selectUserInfoDetails = (state) => state.userInfo.userInfoDetails;
export const selectClientInfoDetails = (state) =>
  state.userInfo.clientInfoDetails;

export default userInfoSlice.reducer;

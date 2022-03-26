import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../backend/firebase";

// --------------- States -------------------
const initialState = {
  userInfoDetails: null,
};

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

// --------------- Actions -------------------
// export const {} = userInfoSlice.actions;

export default userInfoSlice.reducer;

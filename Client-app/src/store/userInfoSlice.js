import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../backend/firebase";

// --------------- States -------------------
const initialState = {
  userInfoDetails: null,
};

export const fetchUserInfo = createAsyncThunk(
  "userInfo/fetchUserInfo",
  async () => {
    // const response = await fetchCount(amount);
    // // The value we return becomes the `fulfilled` action payload
    // return response.data;
    const responseData = await getDoc(
      doc(db, "Client/client.quangtran@gmail.com")
    );

    if (responseData.exists()) {
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

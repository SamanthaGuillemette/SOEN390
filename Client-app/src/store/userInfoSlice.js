import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../backend/firebase";

// --------------- States -------------------
const initialState = {
  userInfoDetails: null,
  doctorInfoDetails: null,
  // userInfoStatus: "idle",
};

export const fetchUserInfo = createAsyncThunk(
  "userInfo/fetchUserInfo",
  async (userEmail) => {
    const responseData = await getDoc(doc(db, `Client/${userEmail}`));

    if (responseData) {
      return responseData.data();
    } else {
      console.log("User info does not exist");
      return initialState;
    }
  }
);

export const fetchDoctorInfo = createAsyncThunk(
  "userInfo/fetchDoctorInfo",
  async (doctorEmail) => {
    const responseData = await getDoc(doc(db, `Admin/${doctorEmail}`));

    if (responseData) {
      return responseData.data();
    } else {
      console.log("Doctor info does not exist");
      return initialState;
    }
  }
);
// export const updateUserInfo = createAsyncThunk(
//   "userInfo/updateUserInfo",
//   async (userEmail, newlyUpdatedInfo) => {
//     const clientDoc = doc(db, `Client/${userEmail}`);
//     const response = await setDoc(clientDoc, newlyUpdatedInfo);

//     if (response) {
//       return newlyUpdatedInfo;
//     } else {
//       console.log("Cannot update user info");
//       return initialState;
//     }
//   }
// );

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,

  // --------------- Reducers -------------------
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.userInfoDetails = action.payload;
    });

    builder.addCase(fetchDoctorInfo.fulfilled, (state, action) => {
      state.doctorInfoDetails = action.payload;
    });
    // builder.addCase(updateUserInfo.pending, (state) => {
    //   state.userInfoStatus = "pending";
    // });
    // builder.addCase(updateUserInfo.fulfilled, (state, action) => {
    //   state.userInfoStatus = "updated";
    //   console.log(action.payload);
    //   state.userInfoDetails = action.payload;
    // });
  },
});

// --------------- Selectors -------------------
export const selectUserInfoDetails = (state) => state.userInfo.userInfoDetails;
export const selectDoctorInfoDetails = (state) =>
  state.userInfo.doctorInfoDetails;

export default userInfoSlice.reducer;

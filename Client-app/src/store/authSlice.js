import { createSlice } from "@reduxjs/toolkit";

// --------------- States -------------------
const initialState = {
  userToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  // --------------- Reducers -------------------
  reducers: {
    saveUser: (state, action) => {
      state.userToken = action.payload;
    },
  },
});

// --------------- Actions -------------------
export const { saveUser } = authSlice.actions;

export default authSlice.reducer;

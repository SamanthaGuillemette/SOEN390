import { createSlice } from "@reduxjs/toolkit";

// --------------- States -------------------
const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  // --------------- Reducers -------------------
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// --------------- Actions -------------------
export const { saveUser } = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: true,
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,

  reducers: {
    openDrawer: (state) => {
      state.open = !state.open;
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

// --------------- Actions -------------------
export const { openDrawer } = drawerSlice.actions;

// --------------- Selectors -------------------
export const openState = (state) => state.drawer.open;

export default drawerSlice.reducer;

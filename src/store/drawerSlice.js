import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: true,
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,

  // --------------- Reducers -------------------
  reducers: {
    openDrawer: (state) => {
      state.open = !state.open;
    },
  },
});

// --------------- Actions -------------------
export const { openDrawer } = drawerSlice.actions;

// --------------- Selectors -------------------
export const openState = (state) => state.drawer.open;

export default drawerSlice.reducer;

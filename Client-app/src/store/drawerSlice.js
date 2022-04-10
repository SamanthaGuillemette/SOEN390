/**
 * @fileoverview This file is the central storage to hold drawer "states" of our application
 */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawerState: false,
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,

  // --------------- Reducers -------------------
  reducers: {
    openDrawer: (state) => {
      state.drawerState = !state.drawerState;
    },
  },
});

// --------------- Actions -------------------
export const { openDrawer } = drawerSlice.actions;

// --------------- Selectors -------------------
export const selectDrawerState = (state) => state.drawer.drawerState;

export default drawerSlice.reducer;

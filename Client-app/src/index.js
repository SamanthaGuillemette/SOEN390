import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./store/authSlice";
import userInfoSlice from "./store/userInfoSlice";

// Configre the Centralized Store
const store = configureStore({
  reducer: {
    auth: authSlice,
    userInfo: userInfoSlice,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

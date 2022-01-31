import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import drawerReducer from "./store/drawerSlice";

// For get a about the <React.StrictMode> for now. All you need to think about is
// 'ReactDOM.render()' will squeeze all the content of <App /> in to the 'div'
// with id = 'root' in the 'index.html' file in the 'public' folder.

//  ┌────────────────────────────────┐
//  │   ...                          │
//  │                                │
//  │   <div id="root"> </div>       │
//  │                  ▲             │
//  │   ...            │             │
//  │                  │             │
//  └──────────────────┼─────────────┘
//                     │
//                ┌────────┐
//                │<App /> │
//                └────────┘
//

// Configre the Centralized Store
const store = configureStore({
  reducer: {
    drawer: drawerReducer,
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

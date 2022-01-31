import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

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

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

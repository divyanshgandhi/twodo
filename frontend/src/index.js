import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div style={{ backgroundColor: "#2b2b2b", height: "100vh", margin: 0, padding: 0 }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </div >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./Redux/Store/store";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "rc-pagination/assets/index.css";

// document.addEventListener("contextmenu", function (e) {
//   e.preventDefault();
// });
// document.onkeydown = function (e) {
//   if (e.keyCode === 123) {
//     return false;
//   }
//   if (e.ctrlKey && e.shiftKey && e.keyCode === "I".charCodeAt(0)) {
//     return false;
//   }
//   if (e.ctrlKey && e.shiftKey && e.keyCode === "C".charCodeAt(0)) {
//     return false;
//   }
//   if (e.ctrlKey && e.shiftKey && e.keyCode === "J".charCodeAt(0)) {
//     return false;
//   }
//   if (e.ctrlKey && e.keyCode === "U".charCodeAt(0)) {
//     return false;
//   }
// };

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

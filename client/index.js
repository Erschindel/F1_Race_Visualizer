import React from "react";
// import reactDom from 'react-dom';
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import "../public/style.css";
import Routes from "./components/Routes";

const app = document.getElementById("app");
const root = createRoot(app);
root.render(
  <Provider store={store}>
    <Routes />
  </Provider>
);

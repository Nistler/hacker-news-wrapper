import React from "react";
import { render } from "react-dom";
import "./style/main.css";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore } from "@reduxjs/toolkit";
import reducers from "./reducers/reducers.js";
// comment

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

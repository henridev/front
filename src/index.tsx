import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/index.css";
import * as serviceWorker from "./serviceWorker";

import App from "./app/App";
import "./services/i18n/i18n";

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
// npm run build && npm i serve -g && serve -s build
// to test serviceworkers on localhost:5000

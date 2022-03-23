import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./configureStore";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.css";
import "react-multi-email/style.css";
import "react-quill/dist/quill.snow.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ConnectedRouter history={history}> */}
      <App />
      {/* </ConnectedRouter> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

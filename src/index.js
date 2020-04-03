import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

//Root
import "./fontawesome";
import "./typography";
import App from "./App";

//Redux
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
//> Middleware
import ReduxThunk from "redux-thunk";
//> Reducers
import authReducer from "@Store/reducers/authentication";
import accReducer from "@Store/reducers/account";
import vendorsReducer from "@Store/reducers/vendors";
import registrationReducer from "@Store/reducers/registration";

export const rootReducer = combineReducers({
  auth: authReducer,
  account: accReducer,
  vendors: vendorsReducer,
  registration: registrationReducer
});

//For Redux debugging (used with Redux Dev Tools Extension). If extension not found, falls back to compose.
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25
      })
    : compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

const target = document.querySelector("#root");
if (target) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    target
  );
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(registration => {
        console.log("SW registered: ", registration);
      })
      .catch(registrationError => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

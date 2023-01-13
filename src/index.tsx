import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { InitialState } from "./reducers/types";
import { rootReducers } from "./reducers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("__state");
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch {
    return null;
  }
};

const saveState = (state: {  }) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("__state", serializedState);
  } catch {
    // ignore
  }
};

const initialState = loadState() || InitialState;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  saveState(store.getState());
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

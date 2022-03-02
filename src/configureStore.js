import { createStore, applyMiddleware } from "redux";
import { createHashHistory } from "history";
import { routerMiddleware } from "connected-react-router";
// import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from "./components/reducers";

export const history = createHashHistory();

const persistedState = sessionStorage.getItem("reduxState")
  ? JSON.parse(sessionStorage.getItem("reduxState"))
  : {};

const store = createStore(
  createRootReducer,
  // createRootReducer(history), // root reducer with router state
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // applyMiddleware(routerMiddleware(history))
);
window.store = store;
store.subscribe(() => {
  sessionStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default store;

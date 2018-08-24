import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import curBoardReducer from "../reducers/curBoard";

export default () => {
  const store = createStore(
    combineReducers({
      curBoard: curBoardReducer
    }),
    devToolsEnhancer({})
  );
  return store;
};

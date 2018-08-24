import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import curBoardReducer from "../reducers/curBoard";
import curThreadReducer from "../reducers/curThread";

export default () => {
  const store = createStore(
    combineReducers({
      curBoard: curBoardReducer,
      curThread: curThreadReducer
    }),
    devToolsEnhancer({})
  );
  return store;
};

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  devToolsEnhancer,
  composeWithDevTools
} from "redux-devtools-extension";
import thunk from "redux-thunk";
import curBoardReducer from "../reducers/curBoard";
import curThreadReducer from "../reducers/curThread";

export default () => {
  const composeEnhancers = composeWithDevTools({});
  const store = createStore(
    combineReducers({
      curBoard: curBoardReducer,
      curThread: curThreadReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};

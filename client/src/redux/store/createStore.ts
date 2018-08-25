import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  devToolsEnhancer,
  composeWithDevTools
} from "redux-devtools-extension";
import thunk from "redux-thunk";
import curBoardReducer from "../reducers/curBoard";
import curThreadReducer from "../reducers/curThread";
import { apiReducer } from "../reducers/api";
import { flashMessagesReducer } from "../reducers/flashMessages";

export default () => {
  const composeEnhancers = composeWithDevTools({});
  const store = createStore(
    combineReducers({
      curBoard: curBoardReducer,
      curThread: curThreadReducer,
      api: apiReducer,
      flashMessages: flashMessagesReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};

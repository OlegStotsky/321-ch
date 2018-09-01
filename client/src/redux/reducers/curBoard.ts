import { IBoardCredentials } from "../../../../shared/lib/types/BoardCredentials";
import {
  CurBoardActionTypes,
  CurBoardActionTypeKeys,
  ISetThreadsAction,
  IAddNewThreadAction
} from "../actions/curBoard";
import { IThread } from "../../lib/Thread";

export interface ICurBoardState {
  curBoard?: IBoardCredentials;
  postingNewThread: boolean;
  postingNewThreadSuccess: boolean;
  threads: IThread[];
  loadingThreads: boolean;
}
const curBoardDefaultState: ICurBoardState = {
  curBoard: null,
  postingNewThread: false,
  postingNewThreadSuccess: false,
  threads: [],
  loadingThreads: false
};

const curBoardReducer = (
  state: ICurBoardState = curBoardDefaultState,
  action: CurBoardActionTypes
) => {
  switch (action.type) {
    case CurBoardActionTypeKeys.CHANGE_CUR_BOARD:
      return {
        ...state,
        curBoard: action.boardCredentials
      };
    case CurBoardActionTypeKeys.POSTING_NEW_THREAD:
      return {
        ...state,
        postingNewThread: true
      };
    case CurBoardActionTypeKeys.POSTING_NEW_THREAD_SUCCESSS:
      return {
        ...state,
        postingNewThreadSuccess: true
      };
    case CurBoardActionTypeKeys.POSTING_NEW_THREAD_FAILURE:
      return {
        ...state,
        postingNewThreadSuccess: false
      };
    case CurBoardActionTypeKeys.NOT_POSTING_NEW_THREAD:
      return {
        ...state,
        postingNewThread: false
      };
    case CurBoardActionTypeKeys.LOADING_THREADS:
      return {
        ...state,
        loadingThreads: true
      };
    case CurBoardActionTypeKeys.NOT_LOADING_THREADS:
      return {
        ...state,
        loadingThreads: false
      };
    case CurBoardActionTypeKeys.SET_THREADS:
      return {
        ...state,
        threads: (action as ISetThreadsAction).threads
      };
    case CurBoardActionTypeKeys.ADD_NEW_THREAD:
      const newThread: IThread = {
        opPost: (action as IAddNewThreadAction).opPost,
        posts: []
      };
      return {
        ...state,
        threads: [...state.threads, newThread]
      };
    default:
      return state;
  }
};

export default curBoardReducer;

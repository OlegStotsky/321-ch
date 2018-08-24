import {
  CurThreadActionTypes,
  ICurThreadActionTypeKeys,
  IChangeCurrentThreadNumberAction,
  ISetCurrentThreadDataAction,
  ICurThreadAddNewPostAction
} from "../actions/curThread";
import { IThread } from "../../lib/Thread";

export interface ICurThreadState {
  curThreadNumber?: number;
  isLoading: boolean;
  curThreadData?: IThread;
  addingNewPost: boolean;
}

const curThreadDefaultState: ICurThreadState = {
  curThreadNumber: null,
  isLoading: true,
  curThreadData: null,
  addingNewPost: false
};

const curThreadReducer = (
  state: ICurThreadState = curThreadDefaultState,
  action: CurThreadActionTypes
): ICurThreadState => {
  switch (action.type) {
    case ICurThreadActionTypeKeys.CHANGE_CUR_THREAD_NUMBER:
      return {
        ...state,
        curThreadNumber: (action as IChangeCurrentThreadNumberAction)
          .threadNumber
      };
    case ICurThreadActionTypeKeys.CURRENT_THREAD_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case ICurThreadActionTypeKeys.CURRENT_THREAD_NOT_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case ICurThreadActionTypeKeys.SET_CUR_THREAD_DATA:
      return {
        ...state,
        curThreadData: (action as ISetCurrentThreadDataAction).curThreadData
      };
    case ICurThreadActionTypeKeys.ADD_NEW_POST:
      return {
        ...state,
        curThreadData: {
          ...state.curThreadData,
          posts: [
            ...state.curThreadData.posts,
            (action as ICurThreadAddNewPostAction).post
          ]
        }
      };
    case ICurThreadActionTypeKeys.CURRENT_THREAD_ADDING_NEW_POST:
      return {
        ...state,
        addingNewPost: true
      };
    case ICurThreadActionTypeKeys.CURRENT_THREAD_NOT_ADDING_NEW_POST:
      return {
        ...state,
        addingNewPost: false
      };
    default:
      return state;
  }
};

export default curThreadReducer;

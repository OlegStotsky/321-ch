import ApiAdapter from "../../lib/ApiAdapter";
import { IThread } from "../../lib/Thread";
import { IBoardCredentials } from "../../../../shared/lib/types/BoardCredentials";
import { IPost } from "../../lib/Post";
import { apiFetchRequested, apiFetchSucceded, apiFetchFailed } from "./api";
import { IRootState } from "../reducers/rootReducer";
import { addNewFlashMessage } from "./flashMessages";

export enum ICurThreadActionTypeKeys {
  CHANGE_CUR_THREAD_NUMBER = "CHANGE_CUR_THREAD_NUMBER",
  CURRENT_THREAD_LOADING = "CURRENT_THREAD_LOADING",
  CURRENT_THREAD_NOT_LOADING = "CURRENT_THREAD_NOT_LOADING",
  CURRENT_THREAD_ADDING_NEW_POST = "CURRENT_THREAD_ADDING_NEW_POST",
  CURRENT_THREAD_NOT_ADDING_NEW_POST = "CURRENT_THREAD_NOT_ADDING_NEW_POST",
  CURRENT_THREAD_LOAD_SUCCESS = "CURRENT_THREAD_LOAD_SUCCESS",
  CURRENT_THREAD_LOAD_FAILURE = "CURRENT_THREAD_LOAD_FAILURE",
  SET_CUR_THREAD_DATA = "SET_CUR_THREAD_DATA",
  ADD_NEW_POST = "ADD_NEW_POST"
}

export interface IChangeCurrentThreadNumberAction {
  type: ICurThreadActionTypeKeys.CHANGE_CUR_THREAD_NUMBER;
  threadNumber: number;
}
export const changeCurrentThreadNumber = (
  threadNumber: number
): IChangeCurrentThreadNumberAction => ({
  type: ICurThreadActionTypeKeys.CHANGE_CUR_THREAD_NUMBER,
  threadNumber
});

export interface ICurrentThreadLoadingAction {
  type: ICurThreadActionTypeKeys;
}
export const currentThreadLoading = (): ICurrentThreadLoadingAction => ({
  type: ICurThreadActionTypeKeys.CURRENT_THREAD_LOADING
});

export interface ICurrentThreadNotLoadingAction {
  type: ICurThreadActionTypeKeys;
}
export const currentThreadNotLoading = (): ICurrentThreadNotLoadingAction => ({
  type: ICurThreadActionTypeKeys.CURRENT_THREAD_NOT_LOADING
});

export interface ISetCurrentThreadDataAction {
  type: ICurThreadActionTypeKeys;
  curThreadData: IThread;
}
export const setCurrentThreadData = (
  curThreadData: IThread
): ISetCurrentThreadDataAction => ({
  type: ICurThreadActionTypeKeys.SET_CUR_THREAD_DATA,
  curThreadData
});

export const loadCurrentThreadData = () => {
  return (dispatch, getCurState: () => IRootState) => {
    dispatch(currentThreadLoading());
    dispatch(apiFetchRequested());
    const curBoardCredentials: IBoardCredentials = getCurState().curBoard
      .curBoard;
    const curThreadNumber: number = getCurState().curThread.curThreadNumber;
    ApiAdapter.getThread(curBoardCredentials, curThreadNumber)
      .then((threadData: IThread) => {
        setTimeout(() => dispatch(apiFetchSucceded()), 500);
        setTimeout(() => dispatch(currentThreadNotLoading()), 500);
        dispatch(curThreadLoadSuccess());
        dispatch(setCurrentThreadData(threadData));
      })
      .catch(e => {
        dispatch(currentThreadNotLoading());
        dispatch(curThreadLoadFailure());
        dispatch(apiFetchFailed());
      });
  };
};

export const sendNewPost = (
  boardCredentials: IBoardCredentials,
  threadNumber: number,
  authorName: string,
  content: string
) => {
  return (dispatch, getCurState) => {
    dispatch(apiFetchRequested());
    dispatch(addingNewPost());
    return ApiAdapter.sendPost(
      boardCredentials,
      threadNumber,
      authorName,
      content
    )
      .then(post => {
        dispatch(addNewPost(post));
        dispatch(apiFetchSucceded());
        dispatch(notAddingNewPost());
      })
      .catch(e => {
        dispatch(notAddingNewPost());
        dispatch(apiFetchFailed());
        e.response.data.errors.forEach(errorMessage =>
          dispatch(addNewFlashMessage(errorMessage))
        );
      });
  };
};

export interface ICurThreadAddNewPostAction {
  type: ICurThreadActionTypeKeys.ADD_NEW_POST;
  post: IPost;
}
export const addNewPost = (post: IPost): ICurThreadAddNewPostAction => ({
  type: ICurThreadActionTypeKeys.ADD_NEW_POST,
  post
});

export interface ICurThreadAddingNewPostAction {
  type: ICurThreadActionTypeKeys.CURRENT_THREAD_ADDING_NEW_POST;
}
export const addingNewPost = (): ICurThreadAddingNewPostAction => ({
  type: ICurThreadActionTypeKeys.CURRENT_THREAD_ADDING_NEW_POST
});

export interface ICurThreadNotAddingNewPostAction {
  type: ICurThreadActionTypeKeys.CURRENT_THREAD_NOT_ADDING_NEW_POST;
}
export const notAddingNewPost = (): ICurThreadNotAddingNewPostAction => ({
  type: ICurThreadActionTypeKeys.CURRENT_THREAD_NOT_ADDING_NEW_POST
});

export interface ICurThreadLoadSuccessAction {
  type: ICurThreadActionTypeKeys.CURRENT_THREAD_LOAD_SUCCESS;
}
export const curThreadLoadSuccess = (): ICurThreadLoadSuccessAction => ({
  type: ICurThreadActionTypeKeys.CURRENT_THREAD_LOAD_SUCCESS
});

export interface ICurThreadLoadFailureAction {
  type: ICurThreadActionTypeKeys.CURRENT_THREAD_LOAD_FAILURE;
}
export const curThreadLoadFailure = (): ICurThreadLoadFailureAction => ({
  type: ICurThreadActionTypeKeys.CURRENT_THREAD_LOAD_FAILURE
});

export type CurThreadActionTypes =
  | IChangeCurrentThreadNumberAction
  | ICurrentThreadLoadingAction
  | ICurrentThreadNotLoadingAction
  | ISetCurrentThreadDataAction
  | ICurThreadAddNewPostAction
  | ICurThreadAddingNewPostAction
  | ICurThreadNotAddingNewPostAction
  | ICurThreadLoadSuccessAction
  | ICurThreadLoadFailureAction;

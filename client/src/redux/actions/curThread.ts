import ApiAdapter from "../../lib/ApiAdapter";
import { IThread } from "../../lib/Thread";
import { IBoardCredentials } from "../../../../shared/lib/types/BoardCredentials";
import { IPost } from "../../lib/Post";

export enum ICurThreadActionTypeKeys {
  CHANGE_CUR_THREAD_NUMBER = "CHANGE_CUR_THREAD_NUMBER",
  CURRENT_THREAD_LOADING = "CURRENT_THREAD_LOADING",
  CURRENT_THREAD_NOT_LOADING = "CURRENT_THREAD_NOT_LOADING",
  CURRENT_THREAD_ADDING_NEW_POST = "CURRENT_THREAD_ADDING_NEW_POST",
  CURRENT_THREAD_NOT_ADDING_NEW_POST = "CURRENT_THREAD_NOT_ADDING_NEW_POST",
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

export const loadCurrentThreadData = (
  boardCredentials: IBoardCredentials,
  threadNumer: number
) => {
  return (dispatch, getCurState) => {
    dispatch(currentThreadLoading());
    ApiAdapter.getThread(boardCredentials, threadNumer).then(
      (threadData: IThread) => {
        dispatch(setCurrentThreadData(threadData));
        dispatch(currentThreadNotLoading());
      }
    );
  };
};

export const sendNewPost = (
  boardCredentials: IBoardCredentials,
  threadNumber: number,
  authorName: string,
  content: string
) => {
  return (dispatch, getCurState) => {
    dispatch(addingNewPost());
    return ApiAdapter.sendPost(
      boardCredentials,
      threadNumber,
      authorName,
      content
    ).then(post => {
      dispatch(addNewPost(post));
      dispatch(notAddingNewPost());
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

export interface ICurThreadAddingNewPost {
  type: ICurThreadActionTypeKeys.CURRENT_THREAD_ADDING_NEW_POST;
}
export const addingNewPost = (): ICurThreadAddingNewPost => ({
  type: ICurThreadActionTypeKeys.CURRENT_THREAD_ADDING_NEW_POST
});

export interface ICurThreadNotAddingNewPost {
  type: ICurThreadActionTypeKeys.CURRENT_THREAD_NOT_ADDING_NEW_POST;
}
export const notAddingNewPost = (): ICurThreadNotAddingNewPost => ({
  type: ICurThreadActionTypeKeys.CURRENT_THREAD_NOT_ADDING_NEW_POST
});

export type CurThreadActionTypes =
  | IChangeCurrentThreadNumberAction
  | ICurrentThreadLoadingAction
  | ICurrentThreadNotLoadingAction
  | ISetCurrentThreadDataAction
  | ICurThreadAddNewPostAction
  | ICurThreadAddingNewPost
  | ICurThreadNotAddingNewPost;

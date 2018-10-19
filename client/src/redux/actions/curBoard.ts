import { IBoardCredentials } from "../../../../shared/lib/types/BoardCredentials";
import ApiAdapter from "../../lib/ApiAdapter";
import { IPost } from "../../lib/Post";
import { addNewFlashMessage, FlashMessageKind } from "./flashMessages";
import { IRootState } from "../reducers/rootReducer";
import { ICurThreadLoadSuccessAction } from "./curThread";
import { ICurBoardState } from "../reducers/curBoard";
import { IThread } from "../../lib/Thread";
import { IFile } from "../../../../shared/lib/types/File";
import ISendThreadDTO from "../../lib/SendThreadDTO";

export enum CurBoardActionTypeKeys {
  CHANGE_CUR_BOARD = "CHANGE_CUR_BOARD",
  POSTING_NEW_THREAD = "POSTING_NEW_THREAD",
  POSTING_NEW_THREAD_SUCCESSS = "POSTING_NEW_THREAD_SUCCESS",
  POSTING_NEW_THREAD_FAILURE = "POSTING_NEW_THREAD_FAILURE",
  NOT_POSTING_NEW_THREAD = "NOT_POSTING_NEW_THREAD",
  ADD_NEW_THREAD = "ADD_NEW_THREAD",
  LOADING_THREADS = "LOADING_THREADS",
  NOT_LOADING_THREADS = "NOT_LOADING_THREADS",
  SET_THREADS = "SET_THREADS"
}

export interface IChangeCurrentBoardAction {
  type: CurBoardActionTypeKeys;
  boardCredentials: IBoardCredentials;
}
export const changangeCurrentBoard = (
  boardCredentials: IBoardCredentials
): IChangeCurrentBoardAction => ({
  type: CurBoardActionTypeKeys.CHANGE_CUR_BOARD,
  boardCredentials
});

export interface IPostingNewThreadAction {
  type: CurBoardActionTypeKeys.POSTING_NEW_THREAD;
}
export const postingNewThread = () => ({
  type: CurBoardActionTypeKeys.POSTING_NEW_THREAD
});

export interface IPostingNewThreadSuccessAction {
  type: CurBoardActionTypeKeys.POSTING_NEW_THREAD_SUCCESSS;
}
export const postingNewThreadSuccess = () => ({
  type: CurBoardActionTypeKeys.POSTING_NEW_THREAD_SUCCESSS
});

export interface IPostingNewThreadFailureAction {
  type: CurBoardActionTypeKeys.POSTING_NEW_THREAD_FAILURE;
}
export const postingNewThreadFailure = () => ({
  type: CurBoardActionTypeKeys.POSTING_NEW_THREAD_FAILURE
});

export interface INotPostingNewThreadAction {
  type: CurBoardActionTypeKeys.POSTING_NEW_THREAD_SUCCESSS;
}
export const notPostingNewThread = () => ({
  type: CurBoardActionTypeKeys.NOT_POSTING_NEW_THREAD
});

export interface IAddNewThreadAction {
  type: CurBoardActionTypeKeys.ADD_NEW_THREAD;
  opPost: IPost;
}
export const addNewThread = (opPost: IPost) => ({
  type: CurBoardActionTypeKeys.ADD_NEW_THREAD,
  opPost
});

export interface ILoadingThreadsAction {
  type: CurBoardActionTypeKeys.LOADING_THREADS;
}
export const loadingThreads = (): ILoadingThreadsAction => ({
  type: CurBoardActionTypeKeys.LOADING_THREADS
});

export interface INotLoadingThreadsAction {
  type: CurBoardActionTypeKeys.NOT_LOADING_THREADS;
}
export const notLoadingThreads = (): INotLoadingThreadsAction => ({
  type: CurBoardActionTypeKeys.NOT_LOADING_THREADS
});

export interface ISetThreadsAction {
  type: CurBoardActionTypeKeys.SET_THREADS;
  threads: IThread[];
}
export const setThreads = (threads: IThread[]): ISetThreadsAction => ({
  type: CurBoardActionTypeKeys.SET_THREADS,
  threads
});

export const postNewThread = (sendThreadDTO: ISendThreadDTO) => {
  return (dispatch, getCurState: () => IRootState) => {
    dispatch(postingNewThread());
    return ApiAdapter.sendThread(getCurState().curBoard.curBoard, sendThreadDTO)
      .then(opPost => {
        dispatch(postingNewThreadSuccess());
        dispatch(addNewThread(opPost));
        dispatch(notPostingNewThread());
        dispatch(
          addNewFlashMessage(
            "Successfully posted new thread",
            FlashMessageKind.Success
          )
        );
      })
      .catch(e => {
        const { message } = e;
        dispatch(postingNewThreadFailure());
        dispatch(notPostingNewThread());
        dispatch(addNewFlashMessage(message, FlashMessageKind.Danger));
      });
  };
};

export const getAllThreads = () => {
  return (dispatch, getCurState) => {
    const curBoard: IBoardCredentials = getCurState().curBoard.curBoard;
    dispatch(loadingThreads());
    ApiAdapter.getThreads(curBoard)
      .then(threads => {
        dispatch(setThreads(threads));
        dispatch(notLoadingThreads());
      })
      .catch(e => {
        const { message } = e;
        dispatch(addNewFlashMessage(message, FlashMessageKind.Danger));
        dispatch(notLoadingThreads());
      });
  };
};

export type CurBoardActionTypes =
  | IChangeCurrentBoardAction
  | IAddNewThreadAction
  | IPostingNewThreadAction
  | INotPostingNewThreadAction
  | IPostingNewThreadSuccessAction
  | IPostingNewThreadFailureAction
  | ISetThreadsAction;

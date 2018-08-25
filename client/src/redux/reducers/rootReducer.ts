import { ICurThreadState } from "./curThread";
import { ICurBoardState } from "./curBoard";
import { IApiState } from "./api";
import { IFlashMessagesState } from "./flashMessages";

export interface IRootState {
  curThread: ICurThreadState;
  curBoard: ICurBoardState;
  api: IApiState;
  flashMessages: IFlashMessagesState;
}

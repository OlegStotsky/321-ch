import { ICurThreadState } from "./curThread";
import { ICurBoardState } from "./curBoard";

export interface IRootState {
  curThread: ICurThreadState;
  curBoard: ICurBoardState;
}

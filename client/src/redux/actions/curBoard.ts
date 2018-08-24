import { IBoardCredentials } from "../../../../shared/lib/types/BoardCredentials";

export enum CurBoardActionTypeKeys {
  CHANGE_CUR_BOARD = "CHANGE_CUR_BOARD"
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

export type CurBoardActionTypes = IChangeCurrentBoardAction;

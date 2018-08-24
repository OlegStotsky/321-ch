import { IBoardCredentials } from "../../../../shared/lib/types/BoardCredentials";
import {
  CurBoardActionTypes,
  CurBoardActionTypeKeys
} from "../actions/curBoard";

export interface ICurBoardState {
  curBoard?: IBoardCredentials;
}
const curBoardDefaultState: ICurBoardState = {
  curBoard: null
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
    default:
      return state;
  }
};

export default curBoardReducer;

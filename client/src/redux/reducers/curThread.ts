import {
  CurThreadActionTypes,
  ICurThreadActionTypeKeys
} from "../actions/curThread";

export interface ICurThreadState {
  curThread?: number;
}

const curThreadDefaultState: ICurThreadState = {
  curThread: null
};

const curThreadReducer = (
  state: ICurThreadState = curThreadDefaultState,
  action: CurThreadActionTypes
) => {
  switch (action.type) {
    case ICurThreadActionTypeKeys.CHANGE_CUR_THREAD:
      return {
        ...state,
        curThread: action.threadNumber
      };
    default:
      return state;
  }
};

export default curThreadReducer;

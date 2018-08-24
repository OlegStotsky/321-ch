export enum ICurThreadActionTypeKeys {
  CHANGE_CUR_THREAD = "CHANGE_CUR_THREAD"
}

export interface IChangeCurrentThread {
  type: ICurThreadActionTypeKeys;
  threadNumber: number;
}

export const changeCurrentThread = (
  threadNumber: number
): IChangeCurrentThread => ({
  type: ICurThreadActionTypeKeys.CHANGE_CUR_THREAD,
  threadNumber
});

export type CurThreadActionTypes = IChangeCurrentThread;

export enum ApiActionTypeKeys {
  FETCH_REQUESTED = "FETCH_REQUESTED",
  FETCH_SUCCEDED = "FETCH_SUCCEDED",
  FETCH_FAILED = "FETCH_FAILED"
}

export interface IApiFetchRequestedAction {
  type: ApiActionTypeKeys.FETCH_REQUESTED;
}
export const apiFetchRequested = (): IApiFetchRequestedAction => ({
  type: ApiActionTypeKeys.FETCH_REQUESTED
});

export interface IApiFetchSuccededAction {
  type: ApiActionTypeKeys.FETCH_SUCCEDED;
}
export const apiFetchSucceded = (): IApiFetchSuccededAction => ({
  type: ApiActionTypeKeys.FETCH_SUCCEDED
});

export interface IApiFetchFailedAction {
  type: ApiActionTypeKeys.FETCH_FAILED;
}
export const apiFetchFailed = (): IApiFetchFailedAction => ({
  type: ApiActionTypeKeys.FETCH_FAILED
});

export type ApiActionTypes =
  | IApiFetchRequestedAction
  | IApiFetchSuccededAction
  | IApiFetchFailedAction;

import { ApiActionTypes, ApiActionTypeKeys } from "../actions/api";

export interface IApiState {
  fetching: boolean;
  fetchSucceded?: boolean;
}

const apiDefaultState: IApiState = {
  fetching: false,
  fetchSucceded: undefined
};

export const apiReducer = (
  state: IApiState = apiDefaultState,
  action: ApiActionTypes
) => {
  switch (action.type) {
    case ApiActionTypeKeys.FETCH_REQUESTED:
      return {
        ...state,
        fetching: true
      };
    case ApiActionTypeKeys.FETCH_SUCCEDED:
      return {
        ...state,
        fetching: false,
        fetchSucceded: true
      };
    case ApiActionTypeKeys.FETCH_FAILED:
      return {
        ...state,
        fetching: false,
        fetchSucceded: false
      };
    default:
      return state;
  }
};

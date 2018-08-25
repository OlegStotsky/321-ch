import {
  FlashMessagesActionType,
  IFlashMessagesActionTypeKeys,
  IAddNewFlashMessageAction
} from "../actions/flashMessages";

export interface IFlashMessagesState {
  messages: string[];
}
const defaultFlashMessagesState: IFlashMessagesState = {
  messages: []
};

export const flashMessagesReducer = (
  state: IFlashMessagesState = defaultFlashMessagesState,
  action: FlashMessagesActionType
) => {
  switch (action.type) {
    case IFlashMessagesActionTypeKeys.NEW_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          (action as IAddNewFlashMessageAction).message
        ]
      };
    default:
      return state;
  }
};

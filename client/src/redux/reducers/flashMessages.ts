import {
  FlashMessagesActionType,
  IFlashMessagesActionTypeKeys,
  IAddNewFlashMessageAction,
  FlashMessageKind,
  IFlashMessage
} from "../actions/flashMessages";

export interface IFlashMessagesState {
  messages: IFlashMessage[];
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
    case IFlashMessagesActionTypeKeys.DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(m => m.id !== action.id)
      };
    default:
      return state;
  }
};

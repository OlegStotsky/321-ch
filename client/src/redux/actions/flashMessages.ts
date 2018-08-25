export enum IFlashMessagesActionTypeKeys {
  NEW_MESSAGE = "NEW_MESSAGE"
}

export interface IAddNewFlashMessageAction {
  type: IFlashMessagesActionTypeKeys.NEW_MESSAGE;
  message: string;
}
export const addNewFlashMessage = (
  message: string
): IAddNewFlashMessageAction => ({
  type: IFlashMessagesActionTypeKeys.NEW_MESSAGE,
  message
});

export type FlashMessagesActionType = IAddNewFlashMessageAction;

import * as shortid from "shortid";

export enum IFlashMessagesActionTypeKeys {
  NEW_MESSAGE = "NEW_MESSAGE",
  DELETE_MESSAGE = "DELETE_MESSAGE"
}

export enum FlashMessageKind {
  Success = "success",
  Warning = "warning",
  Danger = "danger"
}
export interface IFlashMessage {
  text: string;
  kind: FlashMessageKind;
  id: string;
}

export interface IAddNewFlashMessageAction {
  type: IFlashMessagesActionTypeKeys.NEW_MESSAGE;
  message: IFlashMessage;
}
export const addNewFlashMessage = (
  text: string,
  kind: FlashMessageKind
): IAddNewFlashMessageAction => ({
  type: IFlashMessagesActionTypeKeys.NEW_MESSAGE,
  message: {
    text,
    kind,
    id: shortid.generate()
  }
});

export interface IDeleteFlashMessageAction {
  type: IFlashMessagesActionTypeKeys.DELETE_MESSAGE;
  id: string;
}
export const deleteFlashMessage = (id: string): IDeleteFlashMessageAction => ({
  type: IFlashMessagesActionTypeKeys.DELETE_MESSAGE,
  id
});

export type FlashMessagesActionType =
  | IAddNewFlashMessageAction
  | IDeleteFlashMessageAction;

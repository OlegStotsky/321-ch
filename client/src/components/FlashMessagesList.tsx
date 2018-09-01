import * as React from "react";
import { connect } from "react-redux";
import {
  IFlashMessage,
  deleteFlashMessage
} from "../redux/actions/flashMessages";
import { IRootState } from "../redux/reducers/rootReducer";
import FlashMessage from "./FlashMessage";

interface IFlashMessagesListProps {
  messages: IFlashMessage[];
  deleteFlashMessage: (id: string) => any;
}
// tslint:disable-next-line:no-shadowed-variable
const IFlashMessageList: React.SFC<IFlashMessagesListProps> = ({
  messages,
  deleteFlashMessage
}) => (
  <div className="flash-messages">
    {messages.map(message => (
      <FlashMessage
        key={message.id}
        id={message.id}
        kind={message.kind}
        text={message.text}
        onDismiss={deleteFlashMessage}
      />
    ))}
  </div>
);

const mapStateToProps = (state: IRootState) => ({
  messages: state.flashMessages.messages
});

const mapDispatchToProps = dispatch => ({
  deleteFlashMessage: (id: string) => dispatch(deleteFlashMessage(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IFlashMessageList);

import * as React from "react";
import { FlashMessageKind } from "../redux/actions/flashMessages";

interface IFlashMessageProps {
  kind: FlashMessageKind;
  text: string;
  id: string;
  onDismiss: (id: string) => any;
}

export default class FlashMessage extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  public onDismiss = () => {
    this.props.onDismiss(this.props.id);
  };

  public render() {
    return (
      <div className={`flash-message flash-messsage--${this.props.kind}`}>
        <div className="flash-message__text">{this.props.text}</div>
        <a onClick={this.onDismiss} className="flash-message__close">
          <i className="fa fa-close" />
        </a>
      </div>
    );
  }
}

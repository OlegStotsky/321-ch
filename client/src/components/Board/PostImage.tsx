import * as React from "react";

interface IProps {
  url: string;
}

interface IState {
  isOpened: boolean;
}

export default class PostImage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isOpened: false
    };
  }

  public handleClick = e => {
    this.setState(state => ({
      isOpened: !state.isOpened
    }));
  };

  public render() {
    const { url } = this.props;
    const [fileName, type] = url.split(".");
    const { isOpened } = this.state;
    const secondClass = this.state.isOpened
      ? "post__image--full-size"
      : "post__image--preview";
    return (
      <div className={"post__image " + secondClass} onClick={this.handleClick}>
        <img src={`/${url}`} />
      </div>
    );
  }
}

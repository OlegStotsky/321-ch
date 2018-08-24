import * as React from "react";
import NewPostForm from "./NewPostForm";
import ApiAdapter from "../../../lib/ApiAdapter";
import { connect } from "react-redux";
import { IBoardCredentials } from "../../../../../shared/lib/types/BoardCredentials";
import { IRootState } from "../../../redux/reducers/rootReducer";

interface INewPostFormContainerState {
  authorName: string;
  content: string;
}

const lengthConstrains = {
  authorName: 30,
  content: 1500
};

interface IStateProps {
  curBoard: IBoardCredentials;
  curThread: number;
}

class NewPostFormContainer extends React.Component<
  IStateProps,
  INewPostFormContainerState
> {
  public state: INewPostFormContainerState = {
    authorName: "Anonymous",
    content: ""
  };

  constructor(props) {
    super(props);
  }

  public onAuthorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (value.length < lengthConstrains[name]) {
      this.setState(() => ({
        authorName: value
      }));
    }
  };

  public onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    if (value.length < lengthConstrains[name]) {
      this.setState(() => ({
        content: value
      }));
    }
  };

  public onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ApiAdapter.sendPost(
      this.props.curBoard,
      this.props.curThread,
      this.state.authorName,
      this.state.content
    );
  };

  public render() {
    return (
      <NewPostForm
        onAuthorNameChange={this.onAuthorNameChange}
        onContentChange={this.onContentChange}
        onSubmit={this.onSubmit}
        authorName={this.state.authorName}
        content={this.state.content}
      />
    );
  }
}

const mapStateToProps = (state: IRootState): IStateProps => ({
  curBoard: state.curBoard.curBoard,
  curThread: state.curThread.curThread
});

export default connect(mapStateToProps)(NewPostFormContainer);

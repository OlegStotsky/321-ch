import * as React from "react";
import NewPostForm from "./NewPostForm";
import ApiAdapter from "../../../lib/ApiAdapter";
import { connect } from "react-redux";
import { IBoardCredentials } from "../../../../../shared/lib/types/BoardCredentials";
import { IRootState } from "../../../redux/reducers/rootReducer";
import { ICurThreadState } from "../../../redux/reducers/curThread";
import { sendNewPost } from "../../../redux/actions/curThread";

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
  curThread: ICurThreadState;
}

interface IDispatchProps {
  addNewPost: (authorName: string, content: string) => any;
}

type NewPostFormProps = IStateProps & IDispatchProps;

class NewPostFormContainer extends React.Component<
  NewPostFormProps,
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
    this.props
      .addNewPost(this.state.authorName, this.state.content)
      .then(() => {
        this.setState(() => ({
          content: ""
        }));
      });
  };

  public render() {
    return (
      <NewPostForm
        onAuthorNameChange={this.onAuthorNameChange}
        onContentChange={this.onContentChange}
        onSubmit={this.onSubmit}
        authorName={this.state.authorName}
        content={this.state.content}
        isSubmitting={this.props.curThread.addingNewPost}
      />
    );
  }
}

const mapStateToProps = (state: IRootState): IStateProps => ({
  curBoard: state.curBoard.curBoard,
  curThread: state.curThread
});

const mapDispatchToProps = dispatch => ({
  addNewPost: (authorName: string, content: string) =>
    dispatch(sendNewPost(authorName, content))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostFormContainer);

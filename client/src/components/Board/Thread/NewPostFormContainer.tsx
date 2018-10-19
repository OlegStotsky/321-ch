import * as React from "react";
import NewPostForm from "./NewPostForm";
import ApiAdapter from "../../../lib/ApiAdapter";
import { IFile } from "../../../../../shared/lib/types/File";
import { connect } from "react-redux";
import { IBoardCredentials } from "../../../../../shared/lib/types/BoardCredentials";
import { IRootState } from "../../../redux/reducers/rootReducer";
import { ICurThreadState } from "../../../redux/reducers/curThread";
import { sendNewPost } from "../../../redux/actions/curThread";

interface INewPostFormContainerState {
  authorName: string;
  content: string;
  file: IFile;
}

interface IStateProps {
  curBoard: IBoardCredentials;
  curThread: ICurThreadState;
}

interface IDispatchProps {
  addNewPost: (authorName: string, content: string, file: IFile) => any;
}

type NewPostFormProps = IStateProps & IDispatchProps;

class NewPostFormContainer extends React.Component<NewPostFormProps, any> {
  public state: INewPostFormContainerState = {
    authorName: "Anonymous",
    content: "",
    file: {
      name: undefined,
      data: undefined,
      type: undefined
    }
  };

  private lengthConstrains = {
    authorName: 30,
    content: 1500
  };

  constructor(props) {
    super(props);
  }

  public onTextChange = (e: any) => {
    const { name, value } = e.currentTarget;
    if (value.length < this.lengthConstrains[name]) {
      this.setState(() => ({
        content: value
      }));
    }
  };

  public onFileLoadSuccess = (file: IFile) => {
    this.setState(() => ({ file }));
  };

  public onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props
      .addNewPost(this.state.authorName, this.state.content, this.state.file)
      .then(() => {
        this.setState(() => ({
          content: "",
          file: {}
        }));
      });
  };

  public render() {
    return (
      <NewPostForm
        onAuthorNameChange={this.onTextChange}
        onContentChange={this.onTextChange}
        onFileLoadSuccess={this.onFileLoadSuccess}
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
  addNewPost: (authorName: string, content: string, file: IFile) =>
    dispatch(sendNewPost({ authorName, content, file }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostFormContainer);

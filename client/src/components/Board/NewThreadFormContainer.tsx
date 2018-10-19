import * as React from "react";
import NewThreadForm from "./NewThreadForm";
import { connect } from "react-redux";
import { postNewThread } from "../../redux/actions/curBoard";
import { IRootState } from "../../redux/reducers/rootReducer";
import { IFile } from "../../../../shared/lib/types/File";
import ISendThreadDTO from "../../lib/SendThreadDTO";

interface INewThreadFormContainerState {
  authorName: string;
  threadName: string;
  message: string;
  file: IFile;
}

interface IDispatchProps {
  postNewThread?: (sendThreadDTO: ISendThreadDTO) => any;
}

interface IStateProps {
  postingNewThread?: boolean;
}

type INewThreadFormContainerProps = IDispatchProps & IStateProps;

export class NewThreadFormContainer extends React.Component<
  INewThreadFormContainerProps,
  any
> {
  public state: INewThreadFormContainerState = {
    authorName: "Anonymous",
    threadName: "",
    message: "",
    file: {
      name: "",
      type: "",
      data: ""
    }
  };
  private lengthConstrains = {
    authorName: 30,
    threadName: 50,
    message: 1500
  };

  constructor(props) {
    super(props);
  }

  public onChange = (e: any) => {
    const { name, value } = e.currentTarget;
    if (value.length < this.lengthConstrains[name]) {
      this.setState(() => ({
        [name]: value
      }));
    }
  };

  public onFileLoadSuccess = (file: IFile) => {
    this.setState(() => ({ file }));
  };

  public onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const {
      authorName,
      threadName: subject,
      message: content,
      file
    } = this.state;
    this.props
      .postNewThread({
        authorName,
        subject,
        content,
        file
      })
      .then(() => {
        this.setState(() => ({
          threadName: "",
          message: "",
          file: {
            name: "",
            type: "",
            data: ""
          }
        }));
      });
  };

  public render() {
    return (
      <NewThreadForm
        onAuthorNameChange={this.onChange}
        onThreadNameChange={this.onChange}
        onMessageChange={this.onChange}
        onLoadSuccess={this.onFileLoadSuccess}
        onSubmit={this.onSubmit}
        authorName={this.state.authorName}
        threadName={this.state.threadName}
        message={this.state.message}
        isSubmitting={this.props.postingNewThread}
      />
    );
  }
}
const mapStateToProps = (state: IRootState) => ({
  postingNewThread: state.curBoard.postingNewThread
});

const mapDispatchToProps = dispatch => ({
  postNewThread: (sendThreadDTO: ISendThreadDTO) =>
    dispatch(postNewThread(sendThreadDTO))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewThreadFormContainer);

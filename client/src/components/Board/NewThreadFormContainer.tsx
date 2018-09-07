import * as React from "react";
import NewThreadForm from "./NewThreadForm";
import { connect } from "react-redux";
import { postNewThread } from "../../redux/actions/curBoard";
import { IRootState } from "../../redux/reducers/rootReducer";

interface INewThreadFormContainerState {
  authorName: string;
  threadName: string;
  message: string;
}

interface IDispatchProps {
  postNewThread?: (authorName: string, subject: string, content: string) => any;
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
    message: ""
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

  public onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props
      .postNewThread(
        this.state.authorName,
        this.state.threadName,
        this.state.message
      )
      .then(() => {
        this.setState(() => ({
          threadName: "",
          message: ""
        }));
      });
  };

  public render() {
    return (
      <NewThreadForm
        onAuthorNameChange={this.onChange}
        onThreadNameChange={this.onChange}
        onMessageChange={this.onChange}
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
  postNewThread: (authorName: string, subject: string, content: string) =>
    dispatch(postNewThread(authorName, subject, content))
});

export default connect(
mapStateToProps,
  mapDispatchToProps
)(NewThreadFormContainer);

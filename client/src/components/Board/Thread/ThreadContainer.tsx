import * as React from "react";
import Thread from "./Thread";
import { IPost } from "../../../lib/Post";
import { IBoardCredentials } from "../../../../../shared/lib/types/BoardCredentials";
import ApiAdapter from "../../../lib/ApiAdapter";
import { IThread } from "../../../lib/Thread";
import { IRootState } from "../../../redux/reducers/rootReducer";
import { connect } from "react-redux";

interface IThreadContainerProps {
  boardCredentials: IBoardCredentials;
  threadNumber: number;
}

interface IThreadState {
  loading: boolean;
  threadData?: IThread;
}

class ThreadContainer extends React.Component<
  IThreadContainerProps,
  IThreadState
> {
  public state = {
    loading: true,
    threadData: null
  };
  constructor(props) {
    super(props);
    ApiAdapter.getThread(
      this.props.boardCredentials,
      this.props.threadNumber
    ).then(thread => {
      this.setState({
        loading: false,
        threadData: thread
      });
    });
  }

  public render() {
    return (
      <Thread
        boardCredentials={this.props.boardCredentials}
        threadData={this.state.threadData}
        loading={this.state.loading}
        threadNumber={this.props.threadNumber}
      />
    );
  }
}

const mapStateToProps = (state: IRootState): IThreadContainerProps => ({
  boardCredentials: state.curBoard.curBoard,
  threadNumber: state.curThread.curThread
});

export default connect(mapStateToProps)(ThreadContainer);

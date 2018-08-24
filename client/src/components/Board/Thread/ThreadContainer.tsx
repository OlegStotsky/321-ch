import * as React from "react";
import Thread from "./Thread";
import { IPost } from "../../../lib/Post";
import { IBoardCredentials } from "../../../../../shared/lib/types/BoardCredentials";
import ApiAdapter from "../../../lib/ApiAdapter";
import { IThread } from "../../../lib/Thread";
import { IRootState } from "../../../redux/reducers/rootReducer";
import { connect } from "react-redux";
import { loadCurrentThreadData } from "../../../redux/actions/curThread";
import { ICurThreadState } from "../../../redux/reducers/curThread";

interface IStateProps {
  boardCredentials: IBoardCredentials;
  curThread: ICurThreadState;
}

interface IDispatchProps {
  loadCurrentThreadData: (
    boardCredentials: IBoardCredentials,
    threadNumber: number
  ) => any;
}

type ThreadContainerProps = IStateProps & IDispatchProps;

interface IThreadState {
  loading: boolean;
  threadData?: IThread;
}

class ThreadContainer extends React.Component<
  ThreadContainerProps,
  IThreadState
> {
  public state = {
    loading: true,
    threadData: null
  };
  constructor(props) {
    super(props);
  }

  public componentWillMount() {
    this.props.loadCurrentThreadData(
      this.props.boardCredentials,
      this.props.curThread.curThreadNumber
    );
  }

  public render() {
    return (
      <Thread
        boardCredentials={this.props.boardCredentials}
        threadData={this.props.curThread.curThreadData}
        loading={this.props.curThread.isLoading}
        threadNumber={this.props.curThread.curThreadNumber}
      />
    );
  }
}

const mapStateToProps = (state: IRootState): IStateProps => ({
  boardCredentials: state.curBoard.curBoard,
  curThread: state.curThread
});

const mapDispatchToProps = dispatch => ({
  loadCurrentThreadData: (
    boardCredentials: IBoardCredentials,
    threadNumber: number
  ) => dispatch(loadCurrentThreadData(boardCredentials, threadNumber))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreadContainer);

import * as React from "react";
import Thread from "./Thread";
import { IPost } from "../../../lib/Post";
import { IBoardCredentials } from "../../../../../shared/lib/types/BoardCredentials";
import ApiAdapter from "../../../lib/ApiAdapter";
import { IThread } from "../../../lib/Thread";

interface IThreadContainerProps {
  boardCredentials: IBoardCredentials;
  threadNumber: number;
  match: any;
}

interface IThreadState {
  loading: boolean;
  threadData?: IThread;
}

export default class ThreadContainer extends React.Component<
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
      this.props.match.params.threadNumber
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

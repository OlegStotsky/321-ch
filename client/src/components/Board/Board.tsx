import * as React from "react";
import BoardHeader from "./BoardHeader";
import { IBoardCredentials } from "../../../../shared/lib/types/BoardCredentials";
import MidPanel from "./MidPanel";
import { IThread } from "../../lib/Thread";
import ThreadPreview from "./ThreadPreview";
import { IRootState } from "../../redux/reducers/rootReducer";
import { getAllThreads } from "../../redux/actions/curBoard";
import { connect } from "react-redux";
import { css } from "react-emotion";
import { ClipLoader } from "react-spinners";
import BoardList from "./BoardList";

interface IOwnProps {
  boardCredentials: IBoardCredentials;
}

interface IStateProps {
  threads: IThread[];
  threadsLoading: boolean;
}

interface IDispatchProps {
  getAllThreads: () => IThread[];
}

type IBoardProps = IOwnProps & IStateProps & IDispatchProps;

export class Board extends React.Component<IBoardProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    const override = css`
      display: block;
      margin: 5px 10px;
    `;
    return (
      <div>
        <BoardHeader
          actionName="Start a New Thread"
          credentials={this.props.boardCredentials}
        />
        <MidPanel />
        <ClipLoader
          sizeUnit="px"
          size={35}
          loading={this.props.threadsLoading}
          color="rgb(54, 215, 183)"
          className={override}
        />
        <div className="board__body">
          {!this.props.threadsLoading &&
            this.props.threads.map(t => (
              <ThreadPreview
                key={t.opPost.postNumber}
                threadData={t}
                curBoard={this.props.boardCredentials}
              />
            ))}
        </div>
        <div className="board__footer">
          <BoardList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  boardCredentials: state.curBoard.curBoard,
  threads: state.curBoard.threads,
  threadsLoading: state.curBoard.loadingThreads
});
const mapDispatchToProps = dispatch => ({
  getAllThreads: () => dispatch(getAllThreads())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);

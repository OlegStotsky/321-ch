import * as React from "react";
import BoardHeader from "./BoardHeader";
import { IBoardCredentials } from "../../../../shared/lib/types/BoardCredentials";
import MidPanel from "./MidPanel";

interface IBoardProps {
  boardCredentials: IBoardCredentials;
}

class Board extends React.Component<IBoardProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div>
        <BoardHeader credentials={this.props.boardCredentials} />
        <MidPanel />
      </div>
    );
  }
}

export default Board;

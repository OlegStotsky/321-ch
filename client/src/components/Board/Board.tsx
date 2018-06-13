import * as React from "react";
import BoardHeader from "./BoardHeader";
import { IBoardCredentials } from "../../lib/types/BoardCredentials";

interface IBoardProps {
  boardCredentials: IBoardCredentials
}

class Board extends React.Component<IBoardProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div>
        <BoardHeader credentials={this.props.boardCredentials} />
      </div>
    );
  }
}

export default Board;

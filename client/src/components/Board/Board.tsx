import * as React from "react";
import BoardHeader from "./BoardHeader";

interface IBoardProps {
  boardName: string;
}

class Board extends React.Component<IBoardProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div>
        <BoardHeader />
      </div>
    );
  }
}

export default Board;

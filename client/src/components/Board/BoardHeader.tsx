import * as React from "react";
import BoardList from "./BoardList";

const BoardHeader = () => {
  return (
    <header className="board__header">
      <BoardList />
    </header>
  );
};

export default BoardHeader;

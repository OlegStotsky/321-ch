import * as React from "react";
import BoardList from "./BoardList";
import { IBoardCredentials } from "../../lib/types/BoardCredentials";

interface IBoardHeaderProps {
  credentials: IBoardCredentials
}

const BoardHeader: React.SFC<IBoardHeaderProps> = ({ credentials }) => {
  return (
    <header className="board__header">
      <BoardList />
      <h1 className="board__header-name u-center-text">
        {credentials.link + "/"} - {credentials.name}
      </h1>
    </header>
  );
};

export default BoardHeader;

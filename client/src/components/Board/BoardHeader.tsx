import * as React from "react";
import BoardList from "./BoardList";
import { IBoardCredentials } from "../../lib/types/BoardCredentials";
import TextLink from "../TextLink";

interface IBoardHeaderProps {
  credentials: IBoardCredentials;
}

const BoardHeader: React.SFC<IBoardHeaderProps> = ({ credentials }) => {
  return (
    <header className="board__header">
      <BoardList />
      <h1 className="board__header-name u-center-text">
        {credentials.link + "/"} - {credentials.name}
      </h1>
      <hr className="board__header-before-create-button" />
      <div className="board__header-action u-center-text">
        <span className="board__header-action-caret">[</span>
        <a className="board__header-start-new-thread" href="#">
          Start a New Thread
        </a>
        <span className="board__header-action-caret">]</span>
      </div>
    </header>
  );
};

export default BoardHeader;

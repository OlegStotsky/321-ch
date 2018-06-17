import * as React from "react";
import * as $ from "jquery";
import BoardList from "./BoardList";
import { IBoardCredentials } from "../../../../shared/lib/types/BoardCredentials";
import TextLink from "../TextLink";
import ThreadFormContainer from "./ThreadFormContainer";

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
        <div className="board__header-action-button" id="initial-button">
          <span className="board__header-action-caret">[</span>
          <a
            className="board__header-start-new-thread"
            href="#"
            id="start-new-thread"
            onClick={() => {
              $("#new-thread-form").removeClass("u-hide");
              $("#initial-button").addClass("u-hide");
            }}
          >
            Start a New Thread
          </a>
          <span className="board__header-action-caret">]</span>
      </div>
        <div className="new-thread-form u-hide" id="new-thread-form">
          <ThreadFormContainer />
        </div>
      </div>
      <hr className="board__header-after-create-button" />
    </header>
  );
};

export default BoardHeader;

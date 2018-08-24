import * as React from "react";
import * as $ from "jquery";
import BoardList from "./BoardList";
import { IBoardCredentials } from "../../../../shared/lib/types/BoardCredentials";
import TextLink from "../TextLink";
import NewThreadFormContainer from "./NewThreadFormContainer";
import NewPostFormContainer from "./Thread/NewPostFormContainer";

interface IBoardHeaderProps {
  credentials: IBoardCredentials;
  actionName: string;
  Form?: typeof NewThreadFormContainer | typeof NewPostFormContainer;
}

const BoardHeader: React.SFC<IBoardHeaderProps> = ({
  credentials,
  actionName,
  Form
}) => {
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
            id="start-new-thread"
            onClick={() => {
              $("#new-thread-form").removeClass("u-hide");
              $("#initial-button").addClass("u-hide");
            }}
          >
            {actionName}
          </a>
          <span className="board__header-action-caret">]</span>
        </div>
        <div className="new-thread-form u-hide" id="new-thread-form">
          <Form />
        </div>
      </div>
      <hr className="board__header-after-create-button" />
    </header>
  );
};

BoardHeader.defaultProps = {
  Form: NewThreadFormContainer
};

export default BoardHeader;

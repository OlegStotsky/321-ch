import * as React from "react";
import {
  japaneseCultureSection,
  techSection,
  miscSection
} from "../../lib/static/BoardSections";
import { IBoardCredentials } from "../../lib/types/BoardCredentials";
import TextLink from "../TextLink";

interface IBoardListSectionProps {
  boardLinks: IBoardCredentials[];
}

const BoardListSection: React.SFC<IBoardListSectionProps> = ({
  boardLinks
}) => {
  return (
    <div className="board__list">
      <span className="board__list-caret">[</span>
      {boardLinks.map((cred, i) => (
        <TextLink
          key={i}
          data={cred.link}
          href={cred.link}
          color="white"
          classNames={["board__list-link"]}
        />
      ))}
      <span className="board__list-caret">]</span>
    </div>
  );
};

const BoardList = () => {
  return (
    <div>
      <BoardListSection boardLinks={japaneseCultureSection.boardList} />
      <BoardListSection boardLinks={techSection.boardList} />
      <BoardListSection boardLinks={miscSection.boardList} />
    </div>
  );
};

export default BoardList;

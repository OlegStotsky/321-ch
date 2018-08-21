import * as React from "react";
import SearchBarContainer from "./SearchBarContainer";

const MidPanel: React.SFC<any> = () => (
  <div className="board__mid-panel">
    <SearchBarContainer />
    <hr />
  </div>
);

export default MidPanel;

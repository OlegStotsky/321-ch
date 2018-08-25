import * as React from "react";
import SearchBarContainer from "./SearchBarContainer";
import { loadCurrentThreadData } from "../../redux/actions/curThread";
import { connect } from "react-redux";

const MidPanel: React.SFC<any> = ({ dispatch }) => (
  <div className="mid-panel">
    <SearchBarContainer />
    <a
      className="mid-panel__action"
      onClick={() => dispatch(loadCurrentThreadData())}
      role="button"
    >
      Update Thread
    </a>
    <hr />
  </div>
);

export default connect()(MidPanel);

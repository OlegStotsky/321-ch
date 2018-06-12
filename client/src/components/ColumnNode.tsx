import * as React from "react";

const ColumnNode: React.SFC<{ children: React.ReactNode }> = props => {
  return <li className="column__node">{props.children}</li>;
};

export default ColumnNode;

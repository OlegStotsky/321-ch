import * as React from "react";

interface IBoxProps {
  headerMessage: string;
  children?: React.ReactNode;
}

const Box: React.SFC<IBoxProps> = ({ headerMessage, children }) => {
  return (
    <div className="box">
      <h1 className="box__header">{headerMessage}</h1>
      <div className="box__content">{children}</div>
    </div>
  );
};

export default Box;

import * as React from "react";
import { ClipLoader } from "react-spinners";
import { css } from "react-emotion";

interface ILoadingProps {
  isLoading: boolean;
}

const Loading: React.SFC<ILoadingProps> = ({ isLoading }) => {
  const override = css`
    display: block;
    margin: 5px 10px;
  `;
  return (
    <div className="spinner">
      <ClipLoader
        sizeUnit="px"
        size={35}
        loading={isLoading}
        color="rgb(54, 215, 183)"
        className={override}
      />
    </div>
  );
};

export default Loading;

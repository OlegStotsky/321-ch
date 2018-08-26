import * as React from "react";
import BoardHeader from "../BoardHeader";
import MidPanel from "../MidPanel";
import Post from "../Post";
import { IBoardCredentials } from "../../../../../shared/lib/types/BoardCredentials";
import { IPost } from "../../../lib/Post";
import * as moment from "moment";
import { IThread } from "../../../lib/Thread";
import BoardList from "../BoardList";
import NewPostFormContainer from "./NewPostFormContainer";
import { css } from "react-emotion";
import { ClipLoader } from "react-spinners";

interface IThreadProps {
  boardCredentials: IBoardCredentials;
  threadNumber: number;
  threadData?: IThread;
  loading: boolean;
}

const Thread: React.SFC<IThreadProps> = ({
  boardCredentials,
  threadNumber,
  threadData,
  loading
}) => {
  const override = css`
    display: block;
    margin: 10px auto;
  `;
  return (
    <React.Fragment>
      <BoardHeader
        actionName="Post a Reply"
        Form={NewPostFormContainer}
        credentials={boardCredentials}
      />
      <MidPanel />
      <div className="thread__body">
        <div className="spinner">
          {
            <ClipLoader
              sizeUnit="px"
              size={50}
              loading={loading}
              color="rgb(54, 215, 183)"
              className={override}
            />
          }
        </div>
        {threadData && <Post {...threadData.opPost} isOpPost={true} />}
        {threadData &&
          threadData.posts.map(post => (
            <Post key={post.postNumber} {...post} isOpPost={false} />
          ))}
        <MidPanel />
      </div>
      <div className="thread__footer">
        <BoardList />
      </div>
    </React.Fragment>
  );
};

export default Thread;

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
import Loading from "../../Loading";

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
  return (
    <React.Fragment>
      <BoardHeader
        actionName="Post a Reply"
        Form={NewPostFormContainer}
        credentials={boardCredentials}
      />
      <MidPanel />
      <div className="thread__body">
        <Loading isLoading={loading} />
        {threadData && <Post {...threadData.opPost} isOpPost={true} />}
        {threadData &&
          threadData.posts.map(post => (
            <Post key={post.postNumber} {...post} isOpPost={false} />
          ))}
      </div>
      <hr />
    </React.Fragment>
  );
};

export default Thread;

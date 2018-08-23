import * as React from "react";
import BoardHeader from "../BoardHeader";
import MidPanel from "../MidPanel";
import Post from "../Post";
import { IBoardCredentials } from "../../../../../shared/lib/types/BoardCredentials";
import { IPost } from "../../../lib/Post";
import * as moment from "moment";
import { IThread } from "../../../lib/Thread";
import BoardList from "../BoardList";

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
}) => (
  <React.Fragment>
    <BoardHeader credentials={boardCredentials} />
    <MidPanel />
    <div className="thread__body">
      {loading && <div>Loading posts...</div>}
      {!loading && <Post {...threadData.opPost} isOpPost={true} />}
      {!loading &&
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

export default Thread;

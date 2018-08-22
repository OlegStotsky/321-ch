import * as React from "react";
import BoardHeader from "../BoardHeader";
import MidPanel from "../MidPanel";
import Post from "../Post";
import { IBoardCredentials } from "../../../../../shared/lib/types/BoardCredentials";
import { IPost } from "../../../lib/Post";
import * as moment from "moment";
import { IThread } from "../../../lib/Thread";

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
      {!loading &&
        threadData.posts.map(post => (
          <Post
            key={post.postNumber}
            date={moment(post.date)}
            postNumber={post.postNumber}
            authorName={post.authorName}
            content={post.content}
          />
        ))}
    </div>
  </React.Fragment>
);

export default Thread;

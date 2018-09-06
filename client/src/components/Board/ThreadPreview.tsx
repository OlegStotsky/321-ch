import * as React from "react";
import Post from "./Post";
import { IThread } from "../../lib/Thread";
import { IBoardCredentials } from "../../../../shared/lib/types/BoardCredentials";

interface IThreadPreviewProps {
  threadData: IThread;
  curBoard: IBoardCredentials;
}

export default class ThreadPreview extends React.Component<
  IThreadPreviewProps,
  {}
> {
  constructor(props) {
    super(props);
  }

  public render() {
    const { opPost, posts } = this.props.threadData;
    const numberOfOmmitedPosts: number =
      posts.length - Math.min(posts.length, 2);
    const { link } = this.props.curBoard;
    return (
      <div className="thread-preview">
        <Post {...opPost} isOpPost={true} />
        <div className="thread-preview__info">
          <span className="thread-preview__info-text">{`${numberOfOmmitedPosts} replies ommited.`}</span>
          <a
            className="thread-preview__thread-link"
            href={`${link}/${opPost.postNumber}`}
          >
            Click here
          </a>
          <span className="thread-preview__info">to view.</span>
        </div>
        <div className="thread-preview__posts">
          {posts
            .slice(0, 2)
            .map(p => <Post key={p.postNumber} {...p} isOpPost={false} />)}
        </div>
        <hr />
      </div>
    );
  }
}

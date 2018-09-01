import * as React from "react";
import Post from "./Post";
import { IThread } from "../../lib/Thread";

interface IThreadPreviewProps {
  threadData: IThread;
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
    return (
      <div className="thread-preview">
        <Post {...opPost} isOpPost={true} />
        {posts
          .slice(0, 2)
          .map(p => <Post key={p.postNumber} {...p} isOpPost={false} />)}
        <hr />
      </div>
    );
  }
}

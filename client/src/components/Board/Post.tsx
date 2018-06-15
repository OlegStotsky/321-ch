import * as React from "react";
import * as moment from "moment";
import PostId from "../../lib/types/PostId";

interface IPostProps {
  date: moment.Moment;
  postNumber: PostId;
  authorName: string;
  content: string;
}

const Post: React.SFC<IPostProps> = ({ date, postNumber, authorName, content }) => {
  return (
    <div className="post">
      <div className="post__header">
        <span className="post__date">{date.format("D/MM/YY")}</span>
        <span className="post__time">{date.format("HH:mm:ss")}</span>
        <span className="post__number">{`No. ${postNumber}`}</span>
        <span className="post__author">{authorName}</span>
      </div>
      <div className="post__body">
        {content}
      </div>
    </div>
  );
};

export default Post;

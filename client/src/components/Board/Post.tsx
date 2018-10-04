import * as React from "react";
import * as moment from "moment";
import PostId from "../../../../shared/lib/types/PostId";
import PostImage from "./PostImage";

interface IPostProps {
  date: number;
  postNumber: PostId;
  authorName: string;
  content: string;
  subject?: string;
  isOpPost: boolean;
}

const Post: React.SFC<IPostProps> = ({
  date,
  postNumber,
  authorName,
  content,
  subject,
  isOpPost
}) => {
  return (
    <div className={`post ${isOpPost ? "post--opPost" : ""}`}>
      <div
        className={`post__content  ${isOpPost ? "post__content--opPost" : ""}`}
      >
        <div
          className={`post__header  ${isOpPost ? "post__header--opPost" : ""}`}
        >
          {subject && <span className="post__subject">{subject}</span>}
          <span className="post__date">{moment(date).format("D/MM/YY")}</span>
          <span className="post__time">{moment(date).format("HH:mm:ss")}</span>
          <span className="post__number">{`No. ${postNumber}`}</span>
          <span className="post__author">{authorName}</span>
        </div>
        <div className="post__body">
          <PostImage url="https://i.pinimg.com/736x/d4/e8/d3/d4e8d3daab9456b8cdd5d08429c73aa9.jpg" />
          <div className="post__text">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Post;

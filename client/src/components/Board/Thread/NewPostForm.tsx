import * as React from "react";
import { ClipLoader } from "react-spinners";
import { css } from "react-emotion";

interface INewPostFormProps {
  onAuthorNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  authorName: string;
  content: string;
  isSubmitting: boolean;
}

const NewPostForm: React.SFC<INewPostFormProps> = props => {
  const override = css`
    display: block;
    margin: 5px 10px;
  `;
  return (
    <form className="form" onSubmit={props.onSubmit}>
      <div className="spinner">
        <ClipLoader
          sizeUnit="px"
          size={35}
          loading={props.isSubmitting}
          color="rgb(54, 215, 183)"
          className={override}
        />
      </div>
      <div className="form-group">
        <label className="form__label">Name</label>
        <input
          type="text"
          name="authorName"
          value={props.authorName}
          className="form__input"
          onChange={props.onAuthorNameChange}
        />
      </div>
      <div className="form-group">
        <label className="form__label">Content</label>
        <textarea
          value={props.content}
          className="form__input form__input-text"
          name="content"
          rows={20}
          onChange={props.onContentChange}
        />
      </div>
      <div className="form-group u-center-text">
        <button className="form__submit">Submit</button>
      </div>
    </form>
  );
};

export default NewPostForm;
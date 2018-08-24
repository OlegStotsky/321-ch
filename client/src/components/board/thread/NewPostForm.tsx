import * as React from "react";

interface INewPostFormProps {
  onAuthorNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  authorName: string;
  content: string;
}

const NewPostForm: React.SFC<INewPostFormProps> = props => {
  return (
    <form className="form" onSubmit={props.onSubmit}>
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

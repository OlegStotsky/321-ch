import * as React from "react";
import { ClipLoader } from "react-spinners";
import { css } from "react-emotion";
import Loading from "../../Loading";
import FileUpload from "../../FileUpload";
import { IFile } from "../../../../../shared/lib/types/File";

interface INewPostFormProps {
  onAuthorNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFileLoadSuccess: (file: IFile) => any;
  onSubmit: (e: React.FormEvent) => void;
  authorName: string;
  content: string;
  isSubmitting: boolean;
}

const NewPostForm: React.SFC<INewPostFormProps> = props => {
  return (
    <form className="form" onSubmit={props.onSubmit}>
      <Loading isLoading={props.isSubmitting} />
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
      <FileUpload onLoadSuccess={props.onFileLoadSuccess} />
      <div className="form-group u-center-text">
        <button className="form__submit">Submit</button>
      </div>
    </form>
  );
};

export default NewPostForm;

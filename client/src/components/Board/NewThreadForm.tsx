import * as React from "react";
import Loading from "../Loading";
import FileUpload from "../FileUpload";
import { IFile } from "../../../../shared/lib/types/File";

interface IThreadFormProps {
  onAuthorNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onThreadNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onLoadSuccess: (file: IFile) => any;
  onSubmit: (e: React.FormEvent) => void;
  authorName: string;
  threadName: string;
  message: string;
  isSubmitting: boolean;
}

const NewThreadForm: React.SFC<IThreadFormProps> = props => {
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
        <label className="form__label">Thread name</label>
        <input
          type="text"
          name="threadName"
          value={props.threadName}
          className="form__input"
          onChange={props.onThreadNameChange}
        />
      </div>
      <div className="form-group">
        <label className="form__label">Message</label>
        <textarea
          value={props.message}
          className="form__input form__input-text"
          name="message"
          rows={20}
          onChange={props.onMessageChange}
        />
      </div>
      <FileUpload onLoadSuccess={props.onLoadSuccess} />
      <div className="form-group u-center-text">
        <button className="form__submit">Submit</button>
      </div>
    </form>
  );
};

export default NewThreadForm;

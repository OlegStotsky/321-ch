import * as React from "react";

interface IThreadFormProps {
  onAuthorNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onThreadNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  authorName: string;
  threadName: string;
  message: string;
}

const ThreadForm: React.SFC<IThreadFormProps> = props => {
  return (
    <form>
      <div className="form-group">
        <label className="form__label">Name</label>
        <input
          type="text"
          name="authorName"
          value={props.authorName}
          className="form__input"
        />
      </div>
      <div className="form-group">
        <label className="form__label">Thread name</label>
        <input
          type="text"
          name="threadName"
          value={props.threadName}
          className="form__input"
        />
      </div>
      <div className="form-group">
        <label className="form__label">Message</label>
        <textarea value={props.message} className="form__input" name="message" />
      </div>
    </form>
  );
};

export default ThreadForm;

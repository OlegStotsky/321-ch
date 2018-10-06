import * as React from "react";
import { IFile } from "../../../shared/lib/types/File";

interface IProps {
  onLoadSuccess: (file: IFile) => any;
}

export default class FileUpload extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      const result: IFile = {
        data: fileReader.result as string,
        name: files[0].name,
        type: files[0].type
      };
      this.props.onLoadSuccess(result);
    };
  };

  public render() {
    return (
      <div className="form-group">
        <label className="form__label">File</label>
        <input
          type="file"
          className="form__input"
          name="file"
          onChange={this.onChange}
        />
      </div>
    );
  }
}

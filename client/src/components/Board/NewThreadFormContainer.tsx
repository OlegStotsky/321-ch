import * as React from "react";
import NewThreadForm from "./NewThreadForm";

interface INewThreadFormContainerState {
  authorName: string;
  threadName: string;
  message: string;
}

class NewThreadFormContainer extends React.Component<{}, any> {
  public state: INewThreadFormContainerState = {
    authorName: "Anonymous",
    threadName: "",
    message: ""
  };
  private lengthConstrains = {
    authorName: 30,
    threadName: 50,
    message: 1500
  };

  constructor(props) {
    super(props);
  }

  public onChange = (e: any) => {
    const { name, value } = e.currentTarget;
    if (value.length < this.lengthConstrains[name]) {
      this.setState(() => ({
        [name]: value
      }));
    }
  };

  public onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  public render() {
    return (
      <NewThreadForm
        onAuthorNameChange={this.onChange}
        onThreadNameChange={this.onChange}
        onMessageChange={this.onChange}
        onSubmit={this.onSubmit}
        authorName={this.state.authorName}
        threadName={this.state.threadName}
        message={this.state.message}
      />
    );
  }
}

export default NewThreadFormContainer;

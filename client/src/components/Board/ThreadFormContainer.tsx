import * as React from "react";
import ThreadForm from "./ThreadForm";

interface IThreadFormContainerState {
  authorName: string;
  threadName: string;
  message: string;
}

const lengthConstrains = {
  authorName: 30,
  threadName: 50,
  message: 1500
};

class ThreadFormContainer extends React.Component<
  {},
  IThreadFormContainerState
> {
  public state: IThreadFormContainerState = {
    authorName: "Anonymous",
    threadName: "",
    message: ""
  };

  constructor(props) {
    super(props);
  }

  public onAuthorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (value.length < lengthConstrains[name]) {
      this.setState(() => ({
        authorName: value
      }));
    }
  }

  public onThreadNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (value.length < lengthConstrains[name]) {
      this.setState(() => ({
        threadName: value
      }));
    }
  }

  public onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    if (value.length < lengthConstrains[name]) {
      this.setState(() => ({
        message: value
      }));
    }
  }

  public onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  public render() {
    return (
      <ThreadForm
        onAuthorNameChange={this.onAuthorNameChange}
        onThreadNameChange={this.onThreadNameChange}
        onMessageChange={this.onMessageChange}
        onSubmit={this.onSubmit}
        authorName={this.state.authorName}
        threadName={this.state.threadName}
        message={this.state.message}
      />
    );
  }
}

export default ThreadFormContainer;
import * as React from "react";
import SearchBar from "./SearchBar";

interface ISearchBarContainerState {
  query: string;
}

export default class ISearchBarContainer extends React.Component<
  any,
  ISearchBarContainerState
> {
  public state: ISearchBarContainerState = {
    query: ""
  };

  public onChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.currentTarget;
    this.setState(state => ({ query: value }));
  }

  public render() {
    return <SearchBar query={this.state.query} onChange={this.onChange} />;
  }
}

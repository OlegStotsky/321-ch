import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { NewThreadFormContainer } from "../NewThreadFormContainer";
import createStore from "../../../redux/store/createStore";

Enzyme.configure({ adapter: new Adapter() });

describe.skip("NewThreadFormContainer", () => {
  let newThreadFormContainer: any;
  beforeEach(() => {
    newThreadFormContainer = Enzyme.mount(<NewThreadFormContainer />);
  });

  it("Matches snapshot", () => {
    expect(newThreadFormContainer).toMatchSnapshot();
  });
  it("correctly sets authorName onChange", () => {
    newThreadFormContainer
      .instance()
      .onChange({ currentTarget: { name: "authorName", value: "Kolya" } });
    expect(newThreadFormContainer.instance().state.authorName).toEqual("Kolya");
  });
  it("correctly sets threadName onChange", () => {
    newThreadFormContainer
      .instance()
      .onChange({ currentTarget: { name: "threadName", value: "Games" } });
    expect(newThreadFormContainer.instance().state.threadName).toEqual("Games");
  });
  it("correctly sets content onChange", () => {
    newThreadFormContainer.instance().onChange({
      currentTarget: { name: "message", value: "I like to play Call of Duty" }
    });
    expect(newThreadFormContainer.instance().state.message).toEqual(
      "I like to play Call of Duty"
    );
  });
  it("has a default value for author name and it equals Anonymous", () => {
    expect(
      newThreadFormContainer.find("[name='authorName']").instance().value
    ).toEqual("Anonymous");
  });
});

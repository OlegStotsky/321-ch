import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import Box from "../Box";

Enzyme.configure({ adapter: new Adapter() });

describe("TextLink", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = Enzyme.shallow(<Box headerMessage="some message" />);
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("has div with box class name", () => {
    expect(wrapper.find(".box")).toHaveLength(1);
  });
  it("has h1 with class name box__header", () => {
    expect(wrapper.find("h1.box__header")).toHaveLength(1);
  });
  it("has div with class name box__content", () => {
    expect(wrapper.find("div.box__content")).toHaveLength(1);
  });
  it("provides content correctly", () => {
    wrapper = Enzyme.shallow(<Box headerMessage="123">abcd</Box>);
    expect(wrapper.contains("abcd")).toBeTruthy();
  });
});

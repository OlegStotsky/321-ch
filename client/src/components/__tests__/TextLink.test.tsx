import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import TextLink from "../TextLink";

Enzyme.configure({ adapter: new Adapter() });

describe("TextLink", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = Enzyme.shallow(<TextLink data="abcd" href="/" />);
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("has a with text-link className", () => {
    expect(wrapper.find(".text-link")).toHaveLength(1);
  });
  it("provides data correctly", () => {
    expect(wrapper.contains("abcd")).toBe(true);
  });
  it("provides href into a element correctly", () => {
    expect(wrapper.find({ href: "/" })).toHaveLength(1);
  });
});

import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import Column from "../Column";

Enzyme.configure({ adapter: new Adapter() });
describe("Column", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = Enzyme.shallow(<Column headingMessage="abcd" items={["abcd"]} />);
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

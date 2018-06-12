import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import HomePage from "../HomePage";

Enzyme.configure({ adapter: new Adapter() });
describe("HomePage", () => {
  it("shallow renders without crashing", () => {
    Enzyme.shallow(<HomePage />);
  });
});

import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import App from "../App";

Enzyme.configure({ adapter: new Adapter() });
describe("App", () => {
  it("shallow renders without crashing", () => {
    Enzyme.shallow(<App />);
  });
});

import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}) => {
  return shallow(<App {...props} />);
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

describe("it renders components without crashing", () => {
  it("renders component MUIThemeProvider wituhout error", () => {
    const wrapper = setup();
    const MuiThemeProvider = findByTestAttr(wrapper, "nav-bar");
    expect(MuiThemeProvider.length).toBe(0);
  });
});

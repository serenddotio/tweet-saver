import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("App component", () => {
  it("title is shown as expected", () => {
    const wrapper = shallow(<App />);
    const text = wrapper.find("h1").text();
    expect(text).toEqual("Tweet Saver");
  });
});

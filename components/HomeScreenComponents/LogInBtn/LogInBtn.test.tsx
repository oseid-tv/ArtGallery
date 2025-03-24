import React from "react";
import { render, screen } from "../../../test-utils";
import LogInBtn from "./LogInBtn.component";

describe("LogInBtn", () => {
  it("should render correct text", () => {
    render(<LogInBtn />);

    const text = screen.getByText("Log In");

    expect(text).toBeOnTheScreen();
  });
});

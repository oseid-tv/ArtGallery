import React from "react";
import { render, screen } from "../../../test-utils";
import SignUpBtn from "./SignUpBtn.component";

describe("SignUpBtn", () => {
  it("should render correct text", () => {
    render(<SignUpBtn />);

    const text = screen.getByText("Create account");

    expect(text).toBeOnTheScreen();
  });
});

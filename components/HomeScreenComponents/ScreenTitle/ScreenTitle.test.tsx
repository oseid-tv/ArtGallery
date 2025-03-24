import React from "react";
import { render, screen } from "../../../test-utils";
import ScreenTitle from "./ScreenTitle.component";

describe("ScreenTitle", () => {
  it("should render correct text", () => {
    render(<ScreenTitle />);

    const text = screen.getByText("Virtual gallery");

    expect(text).toBeOnTheScreen();
  });
});

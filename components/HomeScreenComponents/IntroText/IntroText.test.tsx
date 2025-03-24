import React from "react";
import { render, screen } from "../../../test-utils";
import IntroText from "./IntroText.component";

describe("IntroText", () => {
  it("should render correct text", () => {
    render(<IntroText />);

    const text = screen.getByText("Become an Artist or a Collector");

    expect(text).toBeOnTheScreen();
  });
});

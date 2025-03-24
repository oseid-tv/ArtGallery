import React from "react";
import { render, screen } from "../../../test-utils";
import ImagesContainer from "./ImagesContainer.component";

describe("ImagesContainer", () => {
  it("should render three images", () => {
    render(<ImagesContainer />);

    const smallImg1 = screen.getByTestId("smallImg1");
    const smallImg2 = screen.getByTestId("smallImg2");
    const bigImg = screen.getByTestId("bigImg");

    expect(smallImg1).toBeOnTheScreen();
    expect(smallImg2).toBeOnTheScreen();
    expect(bigImg).toBeOnTheScreen();
  });
});

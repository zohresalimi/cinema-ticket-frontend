import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import PlayButton from "../";

import { WithProvider } from "../../../mockTestData/data";

function renderWrapper(props) {
  let component;

  act(() => {
    component = render(
      <WithProvider>
        <PlayButton {...props} path="/" />
      </WithProvider>
    );
  });

  return component;
}

describe("PlayButton Component Testing", () => {
  test("take snapshot", async () => {
    const { container, getByTestId } = await renderWrapper();
    expect(getByTestId("play-btn")).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
  test("check setPlayVideo should be called", async () => {
    const mockSetPlayVideo = jest.fn(() => true);

    const { getByTestId } = await renderWrapper({
      setPlayVideo: mockSetPlayVideo,
    });
    fireEvent.click(getByTestId("play-btn"));
    expect(mockSetPlayVideo).toHaveBeenCalled();
  });
});

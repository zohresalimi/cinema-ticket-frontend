import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import TopBar from "../";

import { WithProvider } from "../../../mockTestData/data";

function renderWrapper() {
  let component;

  act(() => {
    component = render(
      <WithProvider>
        <TopBar path="/" />
      </WithProvider>
    );
  });

  return component;
}

describe("TopBar Component Testing", () => {
  test("take snapshot", async () => {
    const { container, getByTestId } = await renderWrapper();
    expect(getByTestId("home-item")).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
  test("go to search page", async () => {
    const { getByTestId } = await renderWrapper();
    expect(getByTestId("serach-icon").getAttribute("href")).toBe("/search");
  });
});

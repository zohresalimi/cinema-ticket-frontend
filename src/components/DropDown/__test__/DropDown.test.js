import * as React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { WithProvider } from "../../../mockTestData/data";
import DropDown from "..";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (k) => k,
    i18n: {
      language: "sv",
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

function renderWrapper(props) {
  let component;

  act(() => {
    component = render(
      <WithProvider>
        <DropDown {...props} path="/" />
      </WithProvider>
    );
  });

  return component;
}

describe("DropDown Component Testing", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test("take snapshot", async () => {
    const { container } = await renderWrapper();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("dropdown should be opened", async () => {
    const { container, getByTestId } = await renderWrapper();
    fireEvent.click(getByTestId("toggle-dropdown"));
    expect(container.firstChild).toMatchSnapshot();
  });
});

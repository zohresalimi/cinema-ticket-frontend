import * as React from "react";

import { act, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { getTestStore, WithProvider } from "../../../mockTestData/data";
import SuccessPage from "../";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (k) => k,
    i18n: {
      language: "sv",
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

async function renderWrapper(props) {
  let component;

  act(() => {
    component = render(
      <WithProvider>
        <SuccessPage {...props} path="/" />
      </WithProvider>
    );
  });

  return component;
}

describe("Success Page Component Testing", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test("take snapshot", async () => {
    const mockDispatch = jest.fn();
    const mockUseContext = jest.fn(() => ({ dispatch: mockDispatch }));
    jest.spyOn(React, "useContext").mockImplementation(mockUseContext);
    const { container } = await renderWrapper();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "resetState",
    });
    expect(container.firstChild).toMatchSnapshot();
  });
});

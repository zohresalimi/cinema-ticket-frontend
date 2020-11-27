import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import HamburgerMenu from "../";

import { WithProvider } from "../../../mockTestData/data";

jest.mock("react-i18next", () => ({
  useTranslation: () => [(key) => key, { changeLanguage: jest.fn() }],
}));

function renderWrapper(props) {
  let component;

  act(() => {
    component = render(
      <WithProvider>
        <HamburgerMenu {...props} path="/" />
      </WithProvider>
    );
  });

  return component;
}

describe("Hamburger Menu Component Testing", () => {
  test("take snapshot", async () => {
    const { container } = await renderWrapper();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should show humbergrt menu by click", async () => {
    const mockSetOpenMenu = jest.fn(() => true);
    const { getByTestId } = await renderWrapper({
      toggleMenu: mockSetOpenMenu,
    });
    fireEvent.click(getByTestId("burger-wrapper"));
    expect(mockSetOpenMenu).toHaveBeenCalled();
  });
});

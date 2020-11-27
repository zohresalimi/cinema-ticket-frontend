import * as React from "react";
import * as reactI18n from "react-i18next";
import { render, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { getTestStore, WithProvider } from "../../../mockTestData/data";
import DropDown from "..";

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
  beforeAll(() => {
    const tMock = jest.fn((k) => k);
    const changeLanguageMock = jest.fn();
    const useTranslationMock = () => [
      tMock,
      {
        language: "sv",
        changeLanguage: changeLanguageMock,
      },
    ];

    jest
      .spyOn(reactI18n, "useTranslation")
      .mockImplementation(useTranslationMock);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test("take snapshot", async () => {
    const { container } = await renderWrapper();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("page should be scrolled", async () => {
    const mockSetIsOpened = jest.fn(() => false);

    const { container, getByTestId } = await renderWrapper();
    fireEvent.click(getByTestId("toogle-dropdown"));
    expect(mockSetIsOpened).toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
  });
  //   test("should play video", async () => {
  //     const setState = jest.fn();
  //     jest.spyOn(React, "useState").mockImplementation(() => [true, setState]);
  //     const movie = getTestStore().state.movies.premiered[0];

  //     const { container } = await renderWrapper({
  //       movie,
  //     });
  //     expect(container.firstChild).toMatchSnapshot();
  //   });
});

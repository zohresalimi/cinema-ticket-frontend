import * as React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { getTestStore, WithProvider } from "../../../mockTestData/data";
import FeaturedMovie from "../";

jest.mock("react-i18next", () => ({
  useTranslation: () => [(key) => key, { changeLanguage: jest.fn() }],
}));

function renderWrapper(props) {
  let component;

  act(() => {
    component = render(
      <WithProvider>
        <FeaturedMovie {...props} path="/" />
      </WithProvider>
    );
  });

  return component;
}

describe("FeaturedMovie Component Testing", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  test("take snapshot", async () => {
    const { container } = await renderWrapper();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should play video", async () => {
    const setState = jest.fn();
    jest.spyOn(React, "useState").mockImplementation(() => [true, setState]);
    const movie = getTestStore().state.movies.premiered[0];

    const { container } = await renderWrapper({
      movie,
    });
    expect(container.firstChild).toMatchSnapshot();
  });
});

import * as React from "react";
import { render, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { getTestStore, WithProvider } from "../../../mockTestData/data";
import Cards from "../";

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
        <Cards {...props} path="/" />
      </WithProvider>
    );
  });

  return component;
}

describe("Cards Component Testing", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test("take snapshot", async () => {
    const { container } = await renderWrapper();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should not show upcoming lablel", async () => {
    const movie = getTestStore().state.movies.premiered[0];

    const { container } = await renderWrapper({
      item: movie,
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should show upcoming lable", async () => {
    const movie = getTestStore().state.movies.upcoming[0];
    const { container } = await renderWrapper({ item: movie });
    expect(container.firstChild).toMatchSnapshot();
  });
});

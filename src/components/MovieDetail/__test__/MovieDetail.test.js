import * as React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { getTestStore, WithProvider } from "../../../mockTestData/data";
import MovieDetail from "../";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { changeLanguage: jest.fn(), language: "sv" },
  }),
}));

function renderWrapper(props) {
  let component;

  act(() => {
    component = render(
      <WithProvider>
        <MovieDetail {...props} path="/" />
      </WithProvider>
    );
  });

  return component;
}

describe("MovieDetail Component Testing", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  test("take snapshot", async () => {
    const { container } = await renderWrapper();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("page should be scrolled", async () => {
    const movie = getTestStore().state.movies.premiered[0];
    const mockOnBookingClick = jest.fn(() => true);

    const { container, getByTestId } = await renderWrapper({
      onBookingClick: mockOnBookingClick,
      movie,
    });
    fireEvent.click(getByTestId("booking-scroll"));
    expect(mockOnBookingClick).toHaveBeenCalled();
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

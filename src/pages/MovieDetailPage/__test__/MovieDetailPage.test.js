import * as React from "react";
import { when } from "jest-when";
import { render, act, waitFor } from "@testing-library/react";
import * as hooks from "../../../hooks/useAxios";
import "@testing-library/jest-dom/extend-expect";
import { getTestStore, WithProvider } from "../../../mockTestData/data";
import MovieDetailPage from "../";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (k) => k,
    i18n: {
      language: "sv",
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

async function renderWrapper(setDefaultState) {
  let component;
  const defaultValue = setDefaultState
    ? {
        user: {},
        movies: {
          upcoming: [],
          children: [],
          premiered: [],
          allMovies: {},
        },
        cinemas: [],
        showings: [],
        ticket: {},
      }
    : null;

  act(() => {
    component = render(
      <WithProvider defaultValue={defaultValue}>
        <MovieDetailPage path="/" />
      </WithProvider>
    );
  });

  return component;
}

jest.mock("../../../components/TopBar", () => () => (
  <div>TopBar Component</div>
));
jest.mock("../../../components/MovieDetail", () => () => (
  <div>MovieDetail Component</div>
));

describe.skip("MovieDetail page Component Testing", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test("take snapshot", async () => {
    const { container } = await renderWrapper(true);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should read current movie from state", async () => {
    const testState = getTestStore().state;
    const movieId = testState.movies.premiered[0]._id;

    const { container } = await renderWrapper({
      category: "children",
      movieId,
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  //   test("should read data from state", async () => {
  //     jest.spyOn(React, "useRef").mockImplementation(useRefMock);
  //     const testState = getTestStore().state;
  //     const mockUseAxios = jest.fn();
  //     when(mockUseAxios)
  //       .calledWith(`/api/v1/movies/current-movie`)
  //       .mockReturnValue([
  //         {
  //           response: testState.movies.premiered,
  //         },
  //       ]);
  //     when(mockUseAxios)
  //       .calledWith(`/api/v1/movies/upcoming`)
  //       .mockReturnValue([
  //         {
  //           response: testState.movies.upcoming,
  //         },
  //       ]);
  //     when(mockUseAxios)
  //       .calledWith(`/api/v1/movies/by-genre`, 1)
  //       .mockReturnValue([
  //         {
  //           response: testState.movies.children,
  //         },
  //       ]);

  //     jest.spyOn(hooks, "default").mockImplementation(mockUseAxios);

  //     const { container } = await renderWrapper(true);
  //     await waitFor(() => expect(mockUseAxios).toHaveBeenCalledTimes(3));
  //     expect(container.firstChild).toMatchSnapshot();
  //   });
});

import * as React from "react";
import { when } from "jest-when";
import { render, act, waitFor, fireEvent } from "@testing-library/react";
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

async function renderWrapper(setDefaultState, props) {
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
      <WithProvider mockDispatch={() => {}} defaultValue={defaultValue}>
        <MovieDetailPage {...props} path="/" />
      </WithProvider>
    );
  });

  return component;
}

jest.mock("../../../components/TopBar", () => () => (
  <div>TopBar Component</div>
));
jest.mock("../../../components/MovieDetail", () => (props) => (
  <div>
    <button onClick={props.onBookingClick} data-testid="button-scroll">
      scroll
    </button>
    MovieDetail Component
  </div>
));

describe("MovieDetail page Component Testing", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("take snapshot", async () => {
    const { container } = await renderWrapper(true);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should call scrollToBookingSection", async () => {
    const mockScrollIntoView = jest.fn();
    const mockCreateRef = jest.fn(() => ({
      current: { scrollIntoView: mockScrollIntoView },
    }));

    jest.spyOn(React, "createRef").mockImplementation(mockCreateRef);

    const { getByTestId } = await renderWrapper();
    fireEvent.click(getByTestId("button-scroll"));
    expect(mockScrollIntoView).toHaveBeenCalled();
  });

  test("should read current movie from state", async () => {
    const testState = getTestStore();
    const movieId = testState.movies.premiered[0]._id;

    const { container } = await renderWrapper(false, {
      category: "premiered",
      movieId,
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should show loading and call useAxios 3 times", async () => {
    const testState = getTestStore();
    const movieId = testState.movies.premiered[0]._id;
    const mockUseAxios = jest.fn();
    when(mockUseAxios)
      .calledWith("/api/v1/cinemas/by-room-ids", { manual: true })
      .mockReturnValue([
        {
          response: null,
        },
        jest.fn(),
      ]);
    when(mockUseAxios)
      .calledWith(`/api/v1/showings/by-movie-id/${movieId}`)
      .mockReturnValue([
        {
          response: null,
          loading: true,
        },
      ]);
    when(mockUseAxios)
      .calledWith("", { manual: true })
      .mockReturnValue([
        {
          response: null,
        },
        jest.fn(),
      ]);

    jest.spyOn(hooks, "default").mockImplementation(mockUseAxios);

    const { container } = await renderWrapper(false, {
      category: "premiered",
      movieId,
    });
    await waitFor(() => expect(mockUseAxios).toHaveBeenCalledTimes(3));
    expect(container.firstChild).toMatchSnapshot();
    jest.clearAllMocks();
  });

  test("set current movie by calling useAxios", async () => {
    const mockUseAxios = jest.fn();
    when(mockUseAxios)
      .calledWith("", {
        manual: true,
      })
      .mockReturnValue([
        {
          response: {},
          loading: true,
        },
      ]);
    when(mockUseAxios)
      .calledWith("/api/v1/cinemas/by-room-ids", { manual: true })
      .mockReturnValue([{}, jest.fn()]);
    when(mockUseAxios)
      .calledWith(`/api/v1/showings/by-movie-id/1`)
      .mockReturnValue([{}]);
    jest.spyOn(hooks, "default").mockImplementation(mockUseAxios);

    const mockSetState = jest.fn();
    const mockUseState = jest.fn(() => [false, mockSetState]);
    jest.spyOn(React, "useState").mockImplementation(mockUseState);
    await renderWrapper(true, {
      movieId: 1,
    });
    expect(mockSetState).toHaveBeenCalled();
    jest.clearAllMocks();
  });

  test("should set cinemas data to state", async () => {
    const mockDispatch = jest.fn();
    const mockUseContext = jest.fn(() => ({
      state: {},
      dispatch: mockDispatch,
    }));
    jest.spyOn(React, "useContext").mockImplementation(mockUseContext);

    const mockUseAxios = jest.fn();
    when(mockUseAxios)
      .calledWith("", {
        manual: true,
      })
      .mockReturnValue([
        {
          response: {},
          loading: true,
        },
      ]);
    when(mockUseAxios)
      .calledWith("/api/v1/cinemas/by-room-ids", { manual: true })
      .mockReturnValue([{ response: {} }, jest.fn()]);
    when(mockUseAxios)
      .calledWith(`/api/v1/showings/by-movie-id/1`)
      .mockReturnValue([{ response: {} }]);
    jest.spyOn(hooks, "default").mockImplementation(mockUseAxios);

    const mockSetState = jest.fn();
    const mockUseState = jest.fn(() => [false, mockSetState]);
    jest.spyOn(React, "useState").mockImplementation(mockUseState);
    await renderWrapper(true, {
      movieId: 1,
    });
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    jest.clearAllMocks();
  });
});

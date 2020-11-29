import * as React from "react";

import { act, render, fireEvent, waitFor } from "@testing-library/react";
import { when } from "jest-when";
import "@testing-library/jest-dom/extend-expect";

import * as hooks from "../../../hooks/useAxios";
import { getTestStore, WithProvider } from "../../../mockTestData/data";
import SearchPage from "../";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (k) => k,
    i18n: {
      language: "sv",
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

jest.mock("../../../components/TopBar", () => () => (
  <div>TopBar Component</div>
));

async function renderWrapper(props) {
  let component;

  act(() => {
    component = render(
      <WithProvider>
        <SearchPage {...props} path="/" />
      </WithProvider>
    );
  });

  return component;
}

describe("Search Page Component Testing", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test("take snapshot", async () => {
    const { container } = await renderWrapper();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should call to search api", async () => {
    const mockUseAxios = jest.fn();
    when(mockUseAxios)
      .calledWith("/api/v1/movies/search", {
        manual: true,
        params: {
          query: "",
        },
      })
      .mockReturnValue([
        {
          response: null,
          loading: true,
        },
        jest.fn(),
      ]);

    jest.spyOn(hooks, "default").mockImplementation(mockUseAxios);
    const { container } = await renderWrapper();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render message when api returns empty list", async () => {
    const mockUseAxios = jest.fn();
    when(mockUseAxios)
      .calledWith("/api/v1/movies/search", {
        manual: true,
        params: {
          query: "",
        },
      })
      .mockReturnValue([
        {
          response: {
            response: [],
          },
          loading: false,
        },
        jest.fn(),
      ]);

    jest.spyOn(hooks, "default").mockImplementation(mockUseAxios);
    const { container } = await renderWrapper();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render items when api returns result", async () => {
    const mockUseAxios = jest.fn();
    when(mockUseAxios)
      .calledWith("/api/v1/movies/search", {
        manual: true,
        params: {
          query: "",
        },
      })
      .mockReturnValue([
        {
          response: {
            response: getTestStore().movies.premiered,
          },
          loading: false,
        },
        jest.fn(),
      ]);
    when(mockUseAxios)
      .calledWith("/api/v1/movies/search", {
        manual: true,
        params: {
          query: "1",
        },
      })
      .mockReturnValue([
        {
          response: {
            response: getTestStore().movies.premiered,
          },
          loading: false,
        },
        jest.fn(),
      ]);

    jest.spyOn(hooks, "default").mockImplementation(mockUseAxios);
    const { container, getByTestId } = await renderWrapper();
    const searchInput = getByTestId("search-input");
    fireEvent.change(searchInput, {
      target: {
        value: "1",
      },
    });
    expect(mockUseAxios).toHaveBeenCalledTimes(2);
    expect(container.firstChild).toMatchSnapshot();
  });
});

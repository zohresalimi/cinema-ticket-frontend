import * as React from "react";
import * as ReachRouter from "@reach/router";

import { act, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import * as hooks from "../../../hooks/useAxios";
import { getTestStore, WithProvider } from "../../../mockTestData/data";
import SeatPage from "../";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (k) => k,
    i18n: {
      language: "sv",
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

async function renderWrapper(setDefaultValue, props) {
  let component;
  const testState = getTestStore();
  const defaultValue = setDefaultValue
    ? {
        ...testState,
        ticket: {
          ...testState.ticket,
          showing: testState.showings[0],
        },
      }
    : null;

  act(() => {
    component = render(
      <WithProvider defaultValue={defaultValue}>
        <SeatPage {...props} path="/" />
      </WithProvider>
    );
  });

  return component;
}

describe("Seat Page Component Testing", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test("take snapshot", async () => {
    const mockUseLocation = jest.fn(() => ({
      state: {
        category: "premiered",
      },
    }));
    jest.spyOn(ReachRouter, "useLocation").mockImplementation(mockUseLocation);
    const { container } = await renderWrapper(true);
    expect(container.firstChild).toMatchSnapshot();
  });
});

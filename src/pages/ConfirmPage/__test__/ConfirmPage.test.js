import * as React from "react";
import * as ReachRouter from "@reach/router";

import { act, render } from "@testing-library/react";
import { when } from "jest-when";
import "@testing-library/jest-dom/extend-expect";

import * as hooks from "../../../hooks/useAxios";
import { getTestStore, WithProvider } from "../../../mockTestData/data";
import ConfirmPage from "../";

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
        <ConfirmPage {...props} path="/" />
      </WithProvider>
    );
  });

  return component;
}

describe.skip("Confirm Page Component Testing", () => {
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
    const testState = getTestStore();
    const seatsMap = new Map();
    seatsMap.set(1, [1, 2]);
    seatsMap.set(2, [1, 4]);
    testState.ticket = {
      ...testState.ticket,
      cinema: testState.cinemas[0],
      seatNumbers: seatsMap,
      showing: {
        ...testState.showings[0],
        room: {
          name: "room name",
        },
      },
    };
    const mockDispatch = jest.fn();
    const mockUseContext = jest.fn(() => ({
      dispatch: mockDispatch,
      state: testState,
    }));
    jest.spyOn(React, "useContext").mockImplementation(mockUseContext);
    const { container } = await renderWrapper();
    expect(container.firstChild).toMatchSnapshot();
  });
});

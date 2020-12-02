import * as React from "react";

import { act, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { getTestStore, WithProvider } from "../../../mockTestData/data";
import BookingPage from "../";

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
        <BookingPage {...props} path="/" />
      </WithProvider>
    );
  });

  return component;
}

describe("Booking Page Component Testing", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test("take snapshot", async () => {
    const testState = getTestStore();
    testState.showings[0].cinema = testState.cinemas[0];
    const mockDispatch = jest.fn();
    const mockUseContext = jest.fn(() => ({
      dispatch: mockDispatch,
      state: testState,
    }));
    jest.spyOn(React, "useContext").mockImplementation(mockUseContext);
    const { container } = await renderWrapper({
      showingId: testState.showings[0]._id,
    });

    expect(mockDispatch).toHaveBeenNthCalledWith(1, {
      type: "setSelectedShowing",
      data: testState.showings[0],
    });

    expect(mockDispatch).toHaveBeenCalledTimes(3);
    expect(container.firstChild).toMatchSnapshot();
  });
});

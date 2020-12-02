import * as React from "react";
import * as ReachRouter from "@reach/router";

import { act, render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { getTestStore, WithProvider } from "../../../mockTestData/data";
import QuantityPage from "../";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (k) => k,
    i18n: {
      language: "sv",
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

async function renderWrapper(defaultValue, props) {
  let component;

  act(() => {
    component = render(
      <WithProvider defaultValue={defaultValue}>
        <QuantityPage {...props} path="/" />
      </WithProvider>
    );
  });

  return component;
}

describe("Quantity Page Component Testing", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test("take snapshot", async () => {
    const mockUseLocation = jest.fn(() => ({
      state: {
        category: "premiered",
      },
    }));

    const mockUseNavigate = jest.fn();

    jest.spyOn(ReachRouter, "useLocation").mockImplementation(mockUseLocation);
    jest.spyOn(ReachRouter, "useNavigate").mockImplementation(mockUseNavigate);

    const { container } = await renderWrapper();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should increase quantity", async () => {
    const testState = getTestStore();
    testState.ticket.showing = testState.showings[0];
    const mockUseLocation = jest.fn(() => ({
      state: {
        category: "premiered",
      },
    }));

    const mockUseNavigate = jest.fn();

    jest.spyOn(ReachRouter, "useLocation").mockImplementation(mockUseLocation);
    jest.spyOn(ReachRouter, "useNavigate").mockImplementation(mockUseNavigate);

    const { container, getByTestId } = await renderWrapper(testState);
    const increment = await getByTestId("increment");
    fireEvent.click(increment);
    expect(getByTestId("ticket-quantity")).toHaveTextContent("1");
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should decrease quantity", async () => {
    const mockUseLocation = jest.fn(() => ({
      state: {
        category: "premiered",
      },
    }));

    const mockUseNavigate = jest.fn();

    jest.spyOn(ReachRouter, "useLocation").mockImplementation(mockUseLocation);
    jest.spyOn(ReachRouter, "useNavigate").mockImplementation(mockUseNavigate);

    const testState = getTestStore();
    testState.ticket.showing = testState.showings[0];

    const { container, getByTestId } = await renderWrapper(testState);
    const decrement = await getByTestId("decrement");
    const increment = await getByTestId("increment");
    fireEvent.click(increment);
    fireEvent.click(increment);
    fireEvent.click(increment);
    fireEvent.click(decrement);
    expect(getByTestId("ticket-quantity")).toHaveTextContent("2");
    expect(container.firstChild).toMatchSnapshot();
  });
});

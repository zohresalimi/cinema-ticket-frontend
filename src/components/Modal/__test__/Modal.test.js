import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Modal from "../";

import { WithProvider } from "../../../mockTestData/data";

function renderWrapper(props) {
  let component;

  act(() => {
    component = render(
      <WithProvider>
        <Modal {...props} path="/" />
      </WithProvider>
    );
  });

  return component;
}

describe("Modal Component Testing", () => {
  test("take snapshot", async () => {
    const { container } = await renderWrapper();
    expect(container.firstChild).toMatchSnapshot();
  });
  test("closeModal should be called", async () => {
    const closeModalMock = jest.fn();

    const { getByTestId } = await renderWrapper({
      closeModal: closeModalMock,
    });
    fireEvent.click(getByTestId("close-btn"));
    expect(closeModalMock).toHaveBeenCalled();
  });
});

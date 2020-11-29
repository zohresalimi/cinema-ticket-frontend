import React from "react";
import { render, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import OrderPage from "../";

jest.mock("../../../components/TopBar", () => () => (
  <div>TopBar Component</div>
));

describe("OrderPage Component Testing", () => {
  test("take snapshot", async () => {
    const { container } = await render(
      <OrderPage>
        <div>order page</div>
      </OrderPage>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

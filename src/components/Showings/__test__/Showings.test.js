import React from "react";
import { render, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { getTestStore, WithProvider } from "../../../mockTestData/data";

import Showings from "../";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (k) => k,
    i18n: {
      language: "sv",
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

function renderWrapper(props) {
  let component;

  act(() => {
    component = render(
      <WithProvider>
        <Showings {...props} path="/" />
      </WithProvider>
    );
  });

  return component;
}

describe("Showings Component Testing", () => {
  const cinemas = getTestStore().cinemas;
  const showings = getTestStore().showings;
  const currentMovie = getTestStore().movies.children[0];
  test("take snapshot when cinema & showings do not match", async () => {
    const { container } = await renderWrapper({
      cinemas,
      showings,
      category: "children",
      currentMovie,
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test("take snapshot when cinema & showings do match", async () => {
    showings[0].room = { ...showings[0].room, cinema: cinemas[0]._id };
    const { container } = await renderWrapper({
      cinemas,
      showings,
      category: "children",
      currentMovie,
    });
    expect(container.firstChild).toMatchSnapshot();
  });
});

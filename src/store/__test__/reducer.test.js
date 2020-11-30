import reducer from "../reducer";
import {
  SET_TICKET_QUANTITY_REDUCER,
  SET_PREMIERED_MOVIE_REDUCER,
  SET_UPCOMING_MOVIE_REDUCER,
  SET_CHILDREN_MOVIE_REDUCER,
  SET_SELECTED_MOVIE_REDUCER,
  SET_SELECTED_SHOWING_REDUCER,
  SET_SELECTED_CINEMA_REDUCER,
  SET_SHOWINGS_MOVIE_REDUCER,
  SET_CINEMAS_REDUCER,
  SET_SELECTED_SEAT,
  SET_PRICE_REDUCER,
  RESET_STATE,
} from "../../constants";
import { getTestStore } from "../../mockTestData/data";

const getEmptyState = () => ({
  user: {},
  movies: {
    upcoming: [],
    children: [],
    premiered: [],
    allMovies: {},
  },
  cinemas: [],
  showings: [],
  ticket: {
    movie: {},
    status: false,
    quantity: 0,
    price: 0,
    seatNumbers: new Map(),
    user: {},
    showing: {},
  },
});

describe("Test Reducer", () => {
  test("should set premiered movies", () => {
    const state = getTestStore();

    const testState = getEmptyState();
    const expectedState = {
      ...testState,
      movies: {
        ...testState.movies,
        premiered: state.movies.premiered,
        allMovies: {
          [state.movies.premiered[0]._id]: "premiered",
        },
      },
    };
    const resultState = reducer(testState, {
      type: SET_PREMIERED_MOVIE_REDUCER,
      data: state.movies.premiered,
    });
    expect(resultState).toEqual(expectedState);
  });

  test("should set upcoming movies", () => {
    const state = getTestStore();

    const testState = getEmptyState();
    const expectedState = {
      ...testState,
      movies: {
        ...testState.movies,
        upcoming: state.movies.upcoming,
        allMovies: {
          [state.movies.upcoming[0]._id]: "upcoming",
        },
      },
    };
    const resultState = reducer(testState, {
      type: SET_UPCOMING_MOVIE_REDUCER,
      data: state.movies.upcoming,
    });
    expect(resultState).toEqual(expectedState);
  });

  test("should set children movies", () => {
    const state = getTestStore();

    const testState = getEmptyState();
    const expectedState = {
      ...testState,
      movies: {
        ...testState.movies,
        children: state.movies.children,
        allMovies: {
          [state.movies.children[0]._id]: "children",
        },
      },
    };
    const resultState = reducer(testState, {
      type: SET_CHILDREN_MOVIE_REDUCER,
      data: state.movies.children,
    });
    expect(resultState).toEqual(expectedState);
  });

  test("should set selected movie", () => {
    const state = getTestStore();

    const testState = getEmptyState();
    const expectedState = {
      ...testState,
      ticket: {
        ...testState.ticket,
        movie: state.movies.children[0],
      },
    };
    const resultState = reducer(testState, {
      type: SET_SELECTED_MOVIE_REDUCER,
      data: state.movies.children[0],
    });
    expect(resultState).toEqual(expectedState);
  });

  test("should set selected showing", () => {
    const state = getTestStore();

    const testState = getEmptyState();
    const expectedState = {
      ...testState,
      ticket: {
        ...testState.ticket,
        showing: state.showings[0],
      },
    };
    const resultState = reducer(testState, {
      type: SET_SELECTED_SHOWING_REDUCER,
      data: state.showings[0],
    });
    expect(resultState).toEqual(expectedState);
  });

  test("should set price", () => {
    const state = getTestStore();

    const testState = getEmptyState();
    const expectedState = {
      ...testState,
      ticket: {
        ...testState.ticket,
        price: state.showings[0].price,
      },
    };
    const resultState = reducer(testState, {
      type: SET_PRICE_REDUCER,
      data: state.showings[0].price,
    });
    expect(resultState).toEqual(expectedState);
  });

  test("should set selected cinema", () => {
    const state = getTestStore();

    const testState = getEmptyState();
    const expectedState = {
      ...testState,
      ticket: {
        ...testState.ticket,
        cinema: state.cinemas[0],
      },
    };
    const resultState = reducer(testState, {
      type: SET_SELECTED_CINEMA_REDUCER,
      data: state.cinemas[0],
    });
    expect(resultState).toEqual(expectedState);
  });

  test("should set showings", () => {
    const state = getTestStore();

    const testState = getEmptyState();
    const expectedState = {
      ...testState,
      showings: state.showings,
    };
    const resultState = reducer(testState, {
      type: SET_SHOWINGS_MOVIE_REDUCER,
      data: state.showings,
    });
    expect(resultState).toEqual(expectedState);
  });

  test("should set cinemas", () => {
    const state = getTestStore();

    const testState = getEmptyState();
    const expectedState = {
      ...testState,
      cinemas: state.cinemas,
    };
    const resultState = reducer(testState, {
      type: SET_CINEMAS_REDUCER,
      data: state.cinemas,
    });
    expect(resultState).toEqual(expectedState);
  });

  test("should set seats number", () => {
    const state = getTestStore();

    const testState = getEmptyState();
    testState.ticket.showing = state.showings[0];
    testState.ticket.seatNumbers = new Map();
    const seatNumbers = new Map();
    const colSet = new Set();
    colSet.add(0);
    seatNumbers.set(1, colSet);
    const expectedState = {
      ...testState,
      ticket: {
        ...testState.ticket,
        seatNumbers,
        showing: {
          ...testState.ticket.showing,
          seats: [
            [
              { seatNumber: 1, taken: "available" },
              { seatNumber: 2, taken: "available" },
            ],
            [
              { seatNumber: 1, taken: "selected" },
              { seatNumber: 2, taken: "available" },
            ],
          ],
        },
      },
    };
    const resultState = reducer(testState, {
      type: SET_SELECTED_SEAT,
      data: [1, 0],
    });
    expect(resultState).toEqual(expectedState);
  });

  test("should set cinemas", () => {
    const testState = getEmptyState();

    const resultState = reducer(testState, {
      type: RESET_STATE,
    });
    expect(resultState).toEqual(testState);
  });

  test("should change capacity and quantity at the same time", () => {
    const testState = getTestStore();
    testState.ticket.showing = testState.showings[0];
    const expectedState = {
      ...testState,
      ticket: {
        ...testState.ticket,
        quantity: 1,
        showing: {
          ...testState.showings[0],
          capacity: 3,
        },
      },
    };
    const resultState = reducer(testState, {
      type: SET_TICKET_QUANTITY_REDUCER,
      data: 1,
    });

    expect(resultState).toEqual(expectedState);
  });
});

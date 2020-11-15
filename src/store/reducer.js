import {
  SET_PREMIERED_MOVIE_REDUCER,
  SET_UPCOMING_MOVIE_REDUCER,
  SET_CHILDREN_MOVIE_REDUCER,
  SET_SELECTED_MOVIE_REDUCER,
  SET_TICKET_QUANTITY_REDUCER,
  SET_SHOWINGS_MOVIE_REDUCER,
  SET_SELECTED_SHOWING_REDUCER,
  SET_SELECTED_CINEMA_REDUCER,
  SET_SELECTED_SEAT,
  SET_PRICE_REDUCER,
  SET_CINEMAS_REDUCER,
  RESET_STATE,
} from "../constants";

const resetState = (state) => {
  return {
    ...state,
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
  };
};

const setSeatSelection = (state, data) => {
  const [row, column] = data;
  const seats = state.ticket.showing.seats.map((seatRow) =>
    seatRow.map((seatCol) => ({ ...seatCol }))
  );
  if (seats[row][column].taken === "available") {
    seats[row][column].taken = "selected";
  } else if (seats[row][column].taken === "selected") {
    seats[row][column].taken = "available";
  }

  const deepCloneMap = (x) => {
    const y = new Map();
    // eslint-disable-next-line no-restricted-syntax
    for (const entry of x) y.set(...entry);
    return y;
  };
  const seatNumbers = deepCloneMap(state.ticket.seatNumbers);

  const existingRow = seatNumbers.get(row);
  if (seats[row][column].taken === "selected") {
    // const existingRow = seatNumbers.find((seat) => seat[0] === row);
    if (existingRow) {
      existingRow.add(column);
    } else {
      seatNumbers.set(row, new Set([column]));
    }
  } else {
    existingRow.delete(column);
    if (!existingRow.size) {
      seatNumbers.delete(row);
    }
  }

  return {
    ...state,
    ticket: {
      ...state.ticket,
      seatNumbers,
      showing: {
        ...state.ticket.showing,
        seats,
      },
    },
  };
};

const setQuantityAndCapacity = (state, data) => {
  const capacity = state.ticket.showing.capacity - 1;
  return {
    ...state,
    ticket: {
      ...state.ticket,
      quantity: data,
      showing: {
        ...state.ticket.showing,
        capacity,
      },
    },
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_PREMIERED_MOVIE_REDUCER:
      return {
        ...state,
        movies: {
          ...state.movies,
          premiered: action.data,
        },
      };
    case SET_UPCOMING_MOVIE_REDUCER:
      return {
        ...state,
        movies: {
          ...state.movies,
          upcoming: action.data,
        },
      };
    case SET_CHILDREN_MOVIE_REDUCER:
      return {
        ...state,
        movies: {
          ...state.movies,
          children: action.data,
        },
      };
    case SET_SELECTED_MOVIE_REDUCER:
      return {
        ...state,
        ticket: {
          ...state.ticket,
          movie: action.data,
        },
      };
    case SET_TICKET_QUANTITY_REDUCER:
      return setQuantityAndCapacity(state, action.data);
    case SET_SELECTED_SHOWING_REDUCER:
      return {
        ...state,
        ticket: {
          ...state.ticket,
          showing: action.data,
        },
      };
    case SET_PRICE_REDUCER:
      return {
        ...state,
        ticket: {
          ...state.ticket,
          price: action.data,
        },
      };
    case SET_SELECTED_CINEMA_REDUCER:
      return {
        ...state,
        ticket: {
          ...state.ticket,
          cinema: action.data,
        },
      };
    case SET_SHOWINGS_MOVIE_REDUCER:
      return {
        ...state,
        showings: action.data,
      };
    case SET_CINEMAS_REDUCER:
      return {
        ...state,
        cinemas: action.data,
      };
    case SET_SELECTED_SEAT:
      return setSeatSelection(state, action.data);
    case RESET_STATE:
      return resetState(state);
    default:
      return state;
  }
};

export default reducer;

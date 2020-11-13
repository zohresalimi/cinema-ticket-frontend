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
} from "../constants";

const setSeatSelection = (state, data) => {
  const [row, column] = data;
  const seats = state.ticket.showing.seats.map((seatRow) =>
    seatRow.map((seatCol) => ({ ...seatCol }))
  );
  seats[row][column].taken = !seats[row][column].taken;

  const deepCloneMap = (x) => {
    const y = new Map();
    // eslint-disable-next-line no-restricted-syntax
    for (const entry of x) y.set(...entry);
    return y;
  };
  const seatNumbers = deepCloneMap(state.ticket.seatNumbers);

  const existingRow = seatNumbers.get(row);
  if (seats[row][column].taken) {
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
    default:
      return state;
  }
};

export default reducer;

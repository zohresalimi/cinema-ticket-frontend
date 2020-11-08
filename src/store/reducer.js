import {
  SET_PREMIERED_MOVIE_REDUCER,
  SET_UPCOMING_MOVIE_REDUCER,
  SET_CHILDREN_MOVIE_REDUCER,
  SET_SELECTED_MOVIE_REDUCER,
  SET_TICKET_QUANTITY_REDUCER,
  SET_SHOWINGS_MOVIE_REDUCER,
  SET_SELECTED_SHOWING_REDUCER,
  SET_PRICE_REDUCER,
} from "../constants";

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
      return {
        ...state,
        ticket: {
          ...state.ticket,
          quantity: action.data,
        },
      };
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
    case SET_SHOWINGS_MOVIE_REDUCER:
      return {
        ...state,
        showings: action.data,
      };
    default:
      return state;
  }
};

export default reducer;

import formatPrice from "../utils/formatPrice";
import {
  SET_PREMIERED_MOVIE_REDUCER,
  SET_UPCOMING_MOVIE_REDUCER,
  SET_CHILDREN_MOVIE_REDUCER,
  SET_SELECTED_MOVIE_REDUCER,
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
        selectedMovie: action.data,
      };
    default:
      return state;
  }
};

export default reducer;

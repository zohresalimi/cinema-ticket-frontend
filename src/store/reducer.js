import formatPrice from "../utils/formatPrice";
import { SET_CURRENT_MOVIE_REDUCER } from "../constants";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_MOVIE_REDUCER:
      return {
        ...state,
        currentMovie: action.data,
      };

    default:
      return state;
  }
};

export default reducer;

import React, { useContext, useEffect } from "react";
import { Link } from "@reach/router";
import AppContext from "../../store/context";
import {
  SET_TICKET_QUANTITY_REDUCER,
  SET_PRICE_REDUCER,
} from "../../constants";

function Booking({ navigate }) {
  const { state, dispatch } = useContext(AppContext);
  const { movie, showing, quantity } = state.ticket;

  const handleIncrement = () => {
    dispatch({ type: SET_TICKET_QUANTITY_REDUCER, data: quantity + 1 });
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      dispatch({ type: SET_TICKET_QUANTITY_REDUCER, data: quantity - 1 });
    }
  };

  useEffect(() => {
    if (showing) {
      dispatch({
        type: SET_PRICE_REDUCER,
        data: showing.price * quantity,
      });
    }
  }, [dispatch, quantity, showing]);

  return (
    <div>
      <Link to={`/movie-detail/${movie._id}`}>{movie.name}</Link>
      <div>
        <button onClick={handleDecrement}>-</button>
        <span>{quantity}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
      <button
        onClick={() => navigate("seat-selection")}
        disabled={quantity <= 0}
      >
        select locations
      </button>
      {quantity === 0 && <p> You must select at least one ticket </p>}
    </div>
  );
}

export default Booking;

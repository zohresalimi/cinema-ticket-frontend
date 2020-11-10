import React, { useContext, useEffect, useState } from "react";
import { Link } from "@reach/router";
import AppContext from "../../store/context";
import {
  SET_TICKET_QUANTITY_REDUCER,
  SET_PRICE_REDUCER,
} from "../../constants";

function Booking() {
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
      <Link to="seat-selection">select locations </Link>
    </div>
  );
}

export default Booking;

import React, { useContext, useState } from "react";
import { Link } from "@reach/router";
import AppContext from "../../store/context";
import { SET_TICKET_QUANTITY_REDUCER } from "../../constants";

function Booking(props) {
  const { state, dispatch } = useContext(AppContext);
  const [ticketquantity, setTicketQuantity] = useState(0);
  const { showingId } = props;
  const { movie } = state.ticket;

  const handleIncrement = () => {
    if (ticketquantity >= 0) {
      setTicketQuantity(ticketquantity + 1);
    }
    dispatch({ type: SET_TICKET_QUANTITY_REDUCER, data: ticketquantity });
  };

  const handleDecrement = () => {
    if (ticketquantity > 0) {
      setTicketQuantity(ticketquantity - 1);
    }
    dispatch({ type: SET_TICKET_QUANTITY_REDUCER, data: ticketquantity });
  };

  return (
    <div>
      <Link to={`/movie-detail/${movie._id}`}>{movie.name}</Link>
      <div>
        <button onClick={handleDecrement}>-</button>
        <span>{ticketquantity}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
}

export default Booking;

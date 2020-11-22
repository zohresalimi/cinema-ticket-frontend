import React, { useContext, useEffect } from "react";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";

import AppContext from "../../store/context";
import {
  SET_TICKET_QUANTITY_REDUCER,
  SET_PRICE_REDUCER,
} from "../../constants";

function Booking({ navigate }) {
  const { state, dispatch } = useContext(AppContext);
  const { movie, showing, quantity } = state.ticket;
  const { t } = useTranslation();

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
      <Link to={`/movie-detail/${movie._id}`}>{t(movie.name)}</Link>
      <h2>{t("number of tickets")}</h2>
      <div>
        <button onClick={handleDecrement}>-</button>
        <span>{quantity}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
      <button
        onClick={() => navigate("seat-selection")}
        disabled={quantity <= 0}
      >
        {t("select location")}
      </button>
      {quantity === 0 && <p>{t("you must select at least one ticket")}</p>}
    </div>
  );
}

export default Booking;

import React, { useContext, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import AppContext from "../../store/context";
import TopBar from "../../components/TopBar";
import Seat from "../SeatPage";
import {
  SET_SELECTED_SHOWING_REDUCER,
  SET_SELECTED_CINEMA_REDUCER,
} from "../../constants";

const stripePromise = loadStripe(
  "pk_test_51HlWoOBo1w65UuRVOCuk1wSITrosNGuUTMxvpsZ0ESnRav6gqD89XE8ukzLgs0PfeV6NWUL8ZUMWMCtTTkKTFDEC00RiYKz72I"
);

function Booking({ showingId, children }) {
  const { state, dispatch } = useContext(AppContext);
  const { showings, ticket, cinemas } = state;

  useEffect(() => {
    if (showingId) {
      const showingObj = showings.find((showing) => showing._id === showingId);
      dispatch({ type: SET_SELECTED_SHOWING_REDUCER, data: showingObj });
    }
  }, [showingId, showings, dispatch]);

  useEffect(() => {
    if (showingId) {
      const cinemaObj = cinemas.find(
        (cinema) => cinema._id === ticket.showing.cinema
      );
      dispatch({ type: SET_SELECTED_CINEMA_REDUCER, data: cinemaObj });
    }
  }, [showingId, showings, dispatch, cinemas, ticket.showing.cinema]);

  const handleClick = async (event) => {
    const stripe = await stripePromise;
    const response = await fetch(
      "http://localhost:8080/api/v1/create-checkout-session",
      {
        method: "POST",
      }
    );
    const session = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <div>
      <TopBar />
      {/* <button role="link" onClick={handleClick}>
        Checkout
      </button> */}

      {children}
    </div>
  );
}

export default Booking;

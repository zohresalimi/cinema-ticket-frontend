/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import AppContext from "../../store/context";
import TopBar from "../../components/TopBar";
import {
  SET_SELECTED_SHOWING_REDUCER,
  SET_SELECTED_CINEMA_REDUCER,
  RESET_TICKET_REDUCER,
} from "../../constants";

function Booking({ showingId, children }) {
  const { state, dispatch } = useContext(AppContext);
  const { showings, cinemas } = state;

  useEffect(() => {
    if (showingId) {
      const showingObj = showings.find((showing) => showing._id === showingId);
      const cinemaObj = cinemas.find(
        (cinema) => cinema._id === showingObj.cinema
      );
      dispatch({ type: SET_SELECTED_SHOWING_REDUCER, data: showingObj });
      dispatch({ type: RESET_TICKET_REDUCER });
      dispatch({ type: SET_SELECTED_CINEMA_REDUCER, data: cinemaObj });
    }
  }, [showingId]);

  return (
    <div>
      <TopBar />

      {children}
    </div>
  );
}

export default Booking;

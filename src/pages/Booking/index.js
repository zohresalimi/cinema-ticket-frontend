import React, { useContext, useEffect } from "react";
import AppContext from "../../store/context";
import TopBar from "../../components/TopBar";
import Quantity from "../../components/Quantity";
import { SET_SELECTED_SHOWING_REDUCER } from "../../constants";

function Booking(props) {
  const { state, dispatch } = useContext(AppContext);
  const { showings } = state;
  const { showingId } = props;

  useEffect(() => {
    if (showingId) {
      const shoeingObj = showings.filter(
        (showing) => showing._id === showingId
      );
      dispatch({ type: SET_SELECTED_SHOWING_REDUCER, data: shoeingObj });
    }
  }, [showingId, showings, dispatch]);
  return (
    <div>
      <TopBar />
      <Quantity />
    </div>
  );
}

export default Booking;

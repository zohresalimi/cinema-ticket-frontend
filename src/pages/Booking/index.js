import React, { useContext, useEffect, useCallback } from "react";
import AppContext from "../../store/context";
import TopBar from "../../components/TopBar";
import Quantity from "../../components/Quantity";
import {
  SET_SELECTED_SHOWING_REDUCE,
  SET_PRICE_REDUCER,
} from "../../constants";

function Booking(props) {
  const { state, dispatch } = useContext(AppContext);
  const { showings } = state;
  const { showingId } = props;

  useEffect(() => {
    if (showingId) {
      const showingObj = showings.filter(
        (showing) => showing._id === showingId
      );
      dispatch({ type: SET_SELECTED_SHOWING_REDUCER, data: showingObj });
    }
  }, [showingId, showings, dispatch]);

  const setPriceToState = useCallback(
    (price) => {
      dispatch({ type: SET_PRICE_REDUCER, data: price });
    },
    [dispatch]
  );

  return (
    <div>
      <TopBar />
      <Quantity setPriceToState={setPriceToState} />
    </div>
  );
}

export default Booking;

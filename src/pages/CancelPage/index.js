import React, { useRef, useEffect, useContext } from "react";
import { RESET_STATE } from "../../constants";
import AppContext from "../../store/context";

function CancelPage() {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: RESET_STATE });
  }, []);
  return <div>Your payment was cancelled. Please try again</div>;
}

export default CancelPage;

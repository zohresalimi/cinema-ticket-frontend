import React, { useContext, useEffect } from "react";
import { RESET_STATE } from "../../constants";
import AppContext from "../../store/context";

function SuccessPage() {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: RESET_STATE });
  }, []);
  return (
    <div>
      You have sucessfully purchased a ticket, an email containing ticket info
      was just sent to the email address provided during purchase.
    </div>
  );
}

export default SuccessPage;

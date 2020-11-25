import React, { useContext, useEffect } from "react";
import { RESET_STATE } from "../../constants";
import AppContext from "../../store/context";
import { Container, Row } from "../../Styles/StyleComponents";

function SuccessPage() {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: RESET_STATE });
  });
  return (
    <Container>
      <Row>
        You have sucessfully purchased a ticket, an email containing ticket info
        was just sent to the email address provided during purchase.
      </Row>
    </Container>
  );
}

export default SuccessPage;

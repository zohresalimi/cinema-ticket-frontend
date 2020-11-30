import React, { useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

import { RESET_STATE } from "../../constants";
import AppContext from "../../store/context";
import { Container, Row } from "../../Styles/StyleComponents";
import Wrapper from "./style";

function CancelPage() {
  const { dispatch } = useContext(AppContext);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch({ type: RESET_STATE });
  });
  return (
    <Wrapper>
      <Container>
        <Row>
          <h1>{t("Your payment was canceled. Please try again")}</h1>
        </Row>
      </Container>
    </Wrapper>
  );
}

export default CancelPage;

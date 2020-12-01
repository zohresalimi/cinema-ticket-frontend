import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { RESET_STATE } from "../../constants";
import AppContext from "../../store/context";
import { Container, Row } from "../../Styles/StyleComponents";
import Wrapper from "./style";

import img from "../../images/img.png";

function SuccessPage() {
  const { dispatch } = useContext(AppContext);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch({ type: RESET_STATE });
  }, [dispatch]);
  return (
    <Wrapper>
      <Container>
        <Row>
          <div className="image-wrapper">
            <img src={img} alt="" />
          </div>
          <h1>{t("You have successfully purchased a ticket")}</h1>
          <p>
            {t(
              "an email containing ticket info was just sent to the email address provided during purchase."
            )}
          </p>
        </Row>
      </Container>
    </Wrapper>
  );
}

export default SuccessPage;

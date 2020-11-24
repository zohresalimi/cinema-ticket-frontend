import React, { useContext, useEffect } from "react";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import AppContext from "../../store/context";
import {
  SET_TICKET_QUANTITY_REDUCER,
  SET_PRICE_REDUCER,
} from "../../constants";
import {
  Container,
  Row,
  Button,
  Breadcrumb,
  Alert,
} from "../../Styles/StyleComponents";
import Quantity from "./style";

function QuantityPage({ navigate, location }) {
  const { state, dispatch } = useContext(AppContext);
  const { movie, showing, quantity } = state.ticket;
  const { category } = location.state;
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
    <Container>
      <Row>
        <div className="full-width">
          <Breadcrumb>
            <Link to={`/${category}/movie-detail/${movie._id}`}>
              <FontAwesomeIcon icon={faAngleLeft} className="mr-10" />
              {t(movie.name)}
            </Link>
          </Breadcrumb>
          <Quantity>
            <p className="breadcrumb">{t("number of tickets")}</p>
            <div>
              <button onClick={handleDecrement}>-</button>
              <span>{quantity}</span>
              <button onClick={handleIncrement}>+</button>
            </div>
          </Quantity>
          <Button
            onClick={() => navigate("seat-selection")}
            disabled={quantity <= 0}
          >
            {t("select location")}
          </Button>
          {quantity === 0 && (
            <Alert>{t("you must select at least one ticket")}</Alert>
          )}
        </div>
      </Row>
    </Container>
  );
}

export default QuantityPage;

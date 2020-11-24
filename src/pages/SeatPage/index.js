/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import AppContext from "../../store/context";
import { SET_SELECTED_SEAT } from "../../constants";
import {
  Container,
  Row,
  Button,
  Breadcrumb,
} from "../../Styles/StyleComponents";
import Wrapper from "./style";

function SeatPlan({ seats, ticketCount }) {
  const { state, dispatch } = useContext(AppContext);
  const { quantity } = state.ticket;

  const bookSeat = (rowIndex, colIndex) => {
    dispatch({ type: SET_SELECTED_SEAT, data: [rowIndex, colIndex] });
  };

  return (
    <Wrapper>
      <p>
        selected
        <span>{ticketCount}</span>
        from
        <span>{quantity}</span>
        {/* {`${ticketCount}/${quantity}`} */}
      </p>
      {seats.map((row, rowIndex) => (
        <div className="column-wrapper" key={`row-${rowIndex}`}>
          {row.map((column, colIndex) => {
            return (
              // eslint-disable-next-line jsx-a11y/interactive-supports-focus
              <div
                role="button"
                disabled={
                  quantity === ticketCount && column.taken === "available"
                }
                className={"seat " + column.taken}
                key={`column-${column.seatNumber}`}
                onClick={() => bookSeat(rowIndex, colIndex)}
              />
            );
          })}
        </div>
      ))}
    </Wrapper>
  );
}

function Seat({ navigate, showingId }) {
  const { state } = useContext(AppContext);
  const { t } = useTranslation();
  const { showing, seatNumbers, quantity } = state.ticket;
  const [ticketCount, setTicketCount] = useState(0);

  useEffect(() => {
    let count = 0;
    for (const [_, columns] of seatNumbers) {
      count += columns.size;
    }
    setTicketCount(count);
  }, [seatNumbers, setTicketCount]);

  return (
    <Container>
      <Row>
        <div className="full-width">
          <Breadcrumb>
            <Link to={`/booking/${showingId}`}>
              <FontAwesomeIcon icon={faAngleLeft} className="mr-10" />
              {t("ticket selection")}
            </Link>
          </Breadcrumb>
          {showing && (
            <SeatPlan ticketCount={ticketCount} seats={showing.seats} />
          )}

          <Button
            disabled={ticketCount < quantity}
            onClick={() => navigate("../confirm-booking")}
          >
            {t("continue")}
          </Button>
          {quantity === 0 && <p>{t("you must select at least one ticket")}</p>}
        </div>
      </Row>
    </Container>
  );
}

export default Seat;

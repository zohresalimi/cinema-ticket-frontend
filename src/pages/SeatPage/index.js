/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useMemo } from "react";
import { Link, useLocation } from "@reach/router";
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
// import seat from "../../images/seat.svg";
import { ReactComponent as SeatIcon } from "../../images/seat.svg";

function SeatPlan({ seats, ticketCount }) {
  const { state, dispatch } = useContext(AppContext);
  const { t } = useTranslation();
  const { quantity } = state.ticket;

  const bookSeat = (rowIndex, colIndex) => {
    dispatch({ type: SET_SELECTED_SEAT, data: [rowIndex, colIndex] });
  };

  return (
    <Wrapper>
      <div className="screen">
        <p>
          {t("selected")}
          <span>{ticketCount}</span>
          {t("from")}
          <span>{quantity}</span>
        </p>
        {seats.map((row, rowIndex) => (
          <div className="column-wrapper" key={`row-${rowIndex}`}>
            {row.map((column, colIndex) => {
              return (
                // eslint-disable-next-line jsx-a11y/interactive-supports-focus
                <div
                  key={`column-${column.seatNumber}`}
                  disabled={
                    quantity === ticketCount && column.taken === "available"
                  }
                >
                  <SeatIcon
                    fill={"seat " + column.taken}
                    className={"seat " + column.taken}
                    onClick={() => bookSeat(rowIndex, colIndex)}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="guideline">
        <div className="available">
          <SeatIcon />
          <p>{t("available")}</p>
        </div>
        <div className="taken">
          <SeatIcon />
          <p>{t("taken")}</p>
        </div>
        <div className="reserved">
          <SeatIcon />
          <p>{t("reserved")}</p>
        </div>
        <div className="selected">
          <SeatIcon />
          <p>{t("selected")}</p>
        </div>
      </div>
    </Wrapper>
  );
}

function Seat({ showingId }) {
  const { state } = useContext(AppContext);
  const { t } = useTranslation();
  const { state: locationState } = useLocation();
  const { showing, seatNumbers, quantity } = state.ticket;

  const ticketCount = useMemo(() => {
    let count = 0;
    for (const [_, columns] of seatNumbers) {
      count += columns.size;
    }
    return count;
  }, [seatNumbers]);

  return (
    <Container>
      <Row>
        <div className="full-width">
          <Breadcrumb>
            <Link
              to={`/booking/${showingId}`}
              state={{ category: locationState.category }}
            >
              <FontAwesomeIcon icon={faAngleLeft} className="mr-10" />
              {t("ticket selection")}
            </Link>
          </Breadcrumb>
          {showing && (
            <SeatPlan ticketCount={ticketCount} seats={showing.seats} />
          )}

          <Button disabled={ticketCount !== quantity}>
            <Link
              to={`/booking/${showing._id}/confirm-booking`}
              state={{ category: locationState.category }}
            >
              {t("continue")}
            </Link>
          </Button>
          {quantity === 0 && <p>{t("you must select at least one ticket")}</p>}
        </div>
      </Row>
    </Container>
  );
}

export default Seat;

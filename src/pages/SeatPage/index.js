/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppContext from "../../store/context";
import { SET_SELECTED_SEAT } from "../../constants";

function SeatPlan({ seats, ticketCount }) {
  const { state, dispatch } = useContext(AppContext);
  const { quantity } = state.ticket;

  const bookSeat = (rowIndex, colIndex) => {
    dispatch({ type: SET_SELECTED_SEAT, data: [rowIndex, colIndex] });
  };

  return (
    <div className="rowrapper">
      {`${ticketCount}/${quantity}`}
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
    </div>
  );
}

function Seat({ navigate }) {
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
    <div>
      {showing && <SeatPlan ticketCount={ticketCount} seats={showing.seats} />}
      <button
        disabled={ticketCount < quantity}
        onClick={() => navigate("../confirm-booking")}
      >
        {t("continue")}
      </button>
    </div>
  );
}

export default Seat;

/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../store/context";
import { SET_SELECTED_SEAT } from "../../constants";

function SeatPlan({ seats }) {
  const { state, dispatch } = useContext(AppContext);
  const { quantity, seatNumbers } = state.ticket;
  const [ticketCount, setTicketCount] = useState(0);

  const bookSeat = (rowIndex, colIndex) => {
    dispatch({ type: SET_SELECTED_SEAT, data: [rowIndex, colIndex] });
  };

  useEffect(() => {
    let count = 0;
    for (const [_, columns] of seatNumbers) {
      count += columns.size;
    }
    setTicketCount(count);
  }, [seatNumbers, setTicketCount]);

  // const isDisabled = () => {
  //   if (quantity > seatNumbers.length) {
  //     seatNumbers.showing.seat.map((seat) => !seat.taken);
  //   }
  // };

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
                disabled={quantity === ticketCount && !column.taken}
                className={"seat " + (column.taken ? "taken" : "")}
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

function Seat() {
  const { state } = useContext(AppContext);
  const { showing } = state.ticket;

  return (
    <div>
      {showing && <SeatPlan seats={showing.seats} />}
      <button>continue</button>
    </div>
  );
}

export default Seat;

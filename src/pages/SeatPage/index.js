import React, { useContext, useCallback } from "react";
import AppContext from "../../store/context";
import {} from "../../constants";

const seat = {
  width: "15px",
  height: "15px",
  border: "1px solid #ccc",
  margin: "3px",
  borderRadius: "0 0 .5em .5em",
  cursor: "pointer",
  "& a:hover": {
    backgroundColor: "green",
  },
};
const rowrapper = {
  display: "flex",
  justifyContent: "center",
};

const bookSeaat = (column) => {
  console.log(column);
};

function SeatPlan({ seats }) {
  return (
    <div style={rowrapper}>
      {seats.map((row, rowIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="column-wrapper" key={`row-${rowIndex}`}>
          {row.map((column) => {
            // eslint-disable-next-line react/no-array-index-key
            return (
              <div
                role="button"
                style={seat}
                key={`column-${column.seatNumber}`}
                onClick={() => bookSeaat(column)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function Seat() {
  const { state, dispatch } = useContext(AppContext);
  const { showing } = state.ticket;

  return <div>{showing && <SeatPlan seats={showing.seats} />}</div>;
}

export default Seat;

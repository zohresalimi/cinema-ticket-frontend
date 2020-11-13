import React, { useContext, useState, useMemo } from "react";
import { Link } from "@reach/router";
import Moment from "react-moment";
import useAxios from "../../hooks/useAxios";
import AppContext from "../../store/context";
import formatPrice from "../../utils/formatPrice";

function ConfirmPage() {
  const { state } = useContext(AppContext);
  const { cinema, movie, price, quantity, seatNumbers, showing } = state.ticket;
  const [email, setEmail] = useState();
  const [checked, setChecked] = useState(false);
  const seatsArray = Array.from(seatNumbers).map((seat) => {
    return [seat[0], [...seat[1]].sort((a, b) => a - b)];
  });

  //   const [{ error, response, isLoading }, createUser] = useAxios(
  //     "/api/v1/users",
  //     {
  //       manual: true,
  //       data: {},
  //       method: "post",
  //     }
  //   );
  const enableButton = useMemo(() => email && checked, [email, checked]);

  return (
    <div>
      <div>
        <Link to="../seat-selection">seat selection </Link>
        <Link to="/"> sing in</Link>
      </div>
      <h2> reservation </h2>
      <div className="movie-info">
        <img src={movie.coverImage} alt="" />
        <div>
          <h4>{movie.name}</h4>
          <p>
            <Moment calendar={showing.startTime} format="dddd" />
            <span>/</span>
            <Moment calendar={showing.startTime} format="D" />
          </p>
          <p>
            <Moment date={showing.startTime} format="hh:mm" />
          </p>
          <p>{cinema.name}</p>
          <p>{showing.room.name}</p>
          <div>
            {seatsArray &&
              seatsArray.map(([row, seats]) => (
                <div key={`r${row}`}>
                  <span> row </span>
                  <span>{row + 1}</span>
                  <span> seat number </span>
                  <span>{seats.map((seat) => seat + 1).join(", ")}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div>
        <p>{`${quantity} ticket`}</p>
        <p>{formatPrice(price)}</p>
      </div>
      <div>
        <p>to pay</p>
        <p>{formatPrice(showing.price)}</p>
      </div>
      <div>
        <label>
          your e-mail:
          <input
            onInput={(e) => setEmail(e.target.value)}
            type="text"
            name="name"
            placeholder="example@gmail.com"
          />
        </label>
      </div>
      <div>
        <label>
          <input
            name="example_1"
            type="checkbox"
            onChange={() => setChecked(!checked)}
          />
          Example 1 (basic input)
        </label>
      </div>
      <button disabled={!enableButton}> continue</button>
    </div>
  );
}

export default ConfirmPage;

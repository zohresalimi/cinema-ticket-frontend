import React, { useState, useContext, useRef } from "react";
import { Link } from "@reach/router";
import useAxios from "../../hooks/useAxios";
import AppContext from "../../store/context";

function MovieDetailPage(props) {
  const { state } = useContext(AppContext);
  const { category, movieId } = props;
  const { movies } = state;
  const [currentMovie] = useState(() => {
    return movies[category].find((movie) => movie._id === movieId);
  });

  const dataRef = useRef({
    params: { rooms: JSON.stringify(currentMovie.rooms) },
  });

  const [{ response: cinemas }] = useAxios(
    `/api/v1/cinemas/by-room-ids`,
    dataRef.current
  );

  // const [{ response: showings }] = useAxios(
  //   `/api/v1/showings/by-movie-id/${currentMovie._id}`
  // );
  // console.log(showings);
  return (
    <div>
      {currentMovie && (
        <div>
          <p>{currentMovie.name}</p>
          <ul>
            {cinemas &&
              cinemas.data.map((item) => {
                return (
                  <li key={item._id}>
                    <Link to="/">{item.name}</Link>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MovieDetailPage;

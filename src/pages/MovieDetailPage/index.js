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

  const [{ response: showings }] = useAxios(
    `/api/v1/showings/by-movie-id/${currentMovie._id}`
  );

  const showingByCinemaId = (cinemaId) => {
    return showings.data.filter((showing) => showing.cinema._id === cinemaId);
  };

  return (
    <div>
      {currentMovie && (
        <div>
          <p>{currentMovie.name}</p>
          <div>
            {cinemas &&
              cinemas.data.map((item) => {
                return (
                  <div key={item._id}>
                    <h2>{item.name}</h2>
                    <ul>
                      {showings &&
                        showingByCinemaId(item._id).map((el) => (
                          <li key={el._id}>
                            <p>{el.startTime}</p>
                            <p>{el.room.name}</p>
                            <p>{el.room.name}</p>
                          </li>
                        ))}
                    </ul>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetailPage;

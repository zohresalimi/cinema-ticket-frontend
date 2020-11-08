import React, { useState, useContext, useRef, useEffect } from "react";
import { Link } from "@reach/router";
import TopBar from "../../components/TopBar";
import useAxios from "../../hooks/useAxios";
import AppContext from "../../store/context";
import {
  SET_SELECTED_MOVIE_REDUCER,
  SET_SHOWINGS_MOVIE_REDUCER,
} from "../../constants";

function MovieDetailPage(props) {
  const { state, dispatch } = useContext(AppContext);
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
    return showings.data.filter((showing) => showing.room.cinema === cinemaId);
  };

  useEffect(() => {
    if (currentMovie) {
      dispatch({ type: SET_SELECTED_MOVIE_REDUCER, data: currentMovie });
    }
  }, [currentMovie, dispatch]);

  useEffect(() => {
    if (showings) {
      dispatch({ type: SET_SHOWINGS_MOVIE_REDUCER, data: showings.data });
    }
  }, [showings, dispatch]);

  return (
    <div>
      <TopBar />
      {currentMovie && (
        <div>
          <img src={currentMovie.coverImage} alt="" />

          <p>{currentMovie.name}</p>
          <p>{currentMovie.description}</p>
          <p>{currentMovie.genre}</p>
          <p>{currentMovie.duration}</p>
          <p>{currentMovie.age}</p>
          <p>
            director:
            {currentMovie.director}
          </p>
          <p>
            premiere:
            {currentMovie.premiere}
          </p>
          <p>actor: </p>
          {currentMovie.actors.map((actor) => (
            <p key={actor}>{actor}</p>
          ))}
          <p>
            original language:
            {currentMovie.originalTitle}
          </p>
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
                            <Link to={`../../../booking/${item._id}`}>
                              <p>{el.startTime}</p>
                              <p>{el.room.name}</p>
                              <p>{currentMovie.originalTitle}</p>
                            </Link>
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

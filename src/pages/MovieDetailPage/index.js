import React, { useState, useContext, useRef, useEffect } from "react";
import { Link } from "@reach/router";
import Moment from "react-moment";
import { useTranslation } from "react-i18next";
import TopBar from "../../components/TopBar";
import useAxios from "../../hooks/useAxios";
import AppContext from "../../store/context";
import {
  SET_SELECTED_MOVIE_REDUCER,
  SET_SHOWINGS_MOVIE_REDUCER,
  SET_CINEMAS_REDUCER,
} from "../../constants";

function MovieDetailPage(props) {
  const { state, dispatch } = useContext(AppContext);
  const { t, i18n } = useTranslation();
  const { category, movieId } = props;
  const { movies } = state;
  const [currentMovie] = useState(() => {
    return movies[category].find((movie) => movie._id === movieId);
  });

  const dataRef = useRef({
    params: { rooms: currentMovie.rooms.join(",") },
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
    if (cinemas) {
      dispatch({ type: SET_CINEMAS_REDUCER, data: cinemas.data });
    }
  }, [cinemas, dispatch]);

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

          <p>{t(currentMovie.name)}</p>
          <p>{t(currentMovie.description)}</p>
          <p>{t(currentMovie.genre)}</p>
          <p>{t(currentMovie.duration)}</p>
          <p>{t(currentMovie.age)}</p>
          <p>
            {t("director")}
            <span>:</span>
            {t(currentMovie.director)}
          </p>
          <p>
            {t("premiere")}
            <span>:</span>
            <Moment
              locale={i18n.language}
              date={currentMovie.premiere}
              format="ddd D MMM"
            />
          </p>
          <p>
            {t("actor")}
            <span>:</span>
          </p>
          {currentMovie.actors.map((actor) => (
            <p key={actor}>{actor}</p>
          ))}
          <p>
            {t("original language")}
            <span>:</span>
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
                        showingByCinemaId(item._id).map((el) =>
                          el.capacity > 0 ? (
                            <li key={el._id}>
                              <Link to={`../../../booking/${el._id}`}>
                                <p>
                                  <Moment date={el.startTime} format="hh:mm" />
                                </p>
                                <p>{t(el.room.name)}</p>
                                <p>{t(currentMovie.originalTitle)}</p>
                              </Link>
                            </li>
                          ) : (
                            <li key={el._id}>
                              <p>
                                <Moment date={el.startTime} format="hh:mm" />
                              </p>
                              <p>{t(el.room.name)}</p>
                              <p>{t(currentMovie.originalTitle)}</p>
                            </li>
                          )
                        )}
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

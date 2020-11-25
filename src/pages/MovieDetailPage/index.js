import React, { useState, useContext, useRef, useEffect } from "react";
import { Link } from "@reach/router";
import Moment from "react-moment";
import { useTranslation } from "react-i18next";
import TopBar from "../../components/TopBar";
import MovieDetail from "../../components/MovieDetail";

import useAxios from "../../hooks/useAxios";
import AppContext from "../../store/context";
import {
  SET_SELECTED_MOVIE_REDUCER,
  SET_SHOWINGS_MOVIE_REDUCER,
  SET_CINEMAS_REDUCER,
} from "../../constants";
import { Container, Row } from "../../Styles/StyleComponents";
import Wrapper from "./style";

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
      <MovieDetail movie={currentMovie} />
      <div className="black-bg">
        <Container>
          <Row>
            <Wrapper>
              {currentMovie && (
                <div>
                  <p className="description">{t(currentMovie.description)}</p>
                  <p className="title">{t("director")}</p>
                  <p>{t(currentMovie.director)}</p>
                  <p className="title">{t("premiere")}</p>
                  <p>
                    <Moment
                      locale={i18n.language}
                      date={currentMovie.premiere}
                      format="ddd D MMM"
                    />
                  </p>
                  <p className="title">{t("actor")}</p>
                  <div className="displayInline">
                    {currentMovie.actors.map((actor) => (
                      <>
                        <p key={actor}>{actor}</p>
                      </>
                    ))}
                  </div>

                  <p className="title">{t("original language")}</p>
                  <p>{currentMovie.originalTitle}</p>
                  <h2 className="buyTicket">{t("book tickets")}</h2>
                  <div>
                    {cinemas &&
                      cinemas.data.map((item) => {
                        return (
                          <div key={item._id}>
                            <h2 className="cinema-name">{item.name}</h2>
                            <ul className="showings-list">
                              {showings &&
                                showingByCinemaId(item._id).map((el) =>
                                  el.capacity > 0 ? (
                                    <li key={el._id}>
                                      <Link
                                        to={`../../../booking/${el._id}`}
                                        state={{ category }}
                                      >
                                        <div className="showing-info">
                                          <p className="time-slot">
                                            <Moment
                                              date={el.startTime}
                                              format="hh:mm"
                                            />
                                          </p>
                                          <p className="room-name">
                                            {t(el.room.name)}
                                          </p>
                                          <p className="movie-subtitle">
                                            {t("lang")}
                                            {":"}
                                            {t(currentMovie.originalTitle)}
                                          </p>
                                        </div>
                                        <div className="buy-ticket">
                                          <p>{t("buy ticket")}</p>
                                        </div>
                                      </Link>
                                    </li>
                                  ) : (
                                    <li key={el._id}>
                                      <p className="room-name">
                                        <Moment
                                          date={el.startTime}
                                          format="hh:mm"
                                        />
                                      </p>
                                      <p className="room-name">
                                        {t(el.room.name)}
                                      </p>
                                      <p className="buy-ticket">
                                        {t(currentMovie.originalTitle)}
                                      </p>
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
            </Wrapper>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default MovieDetailPage;

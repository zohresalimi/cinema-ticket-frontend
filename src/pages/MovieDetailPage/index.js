import React, {
  useState,
  useContext,
  useMemo,
  useEffect,
  createRef,
} from "react";
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
  const [currentMovie, setCurrentMovie] = useState(() => {
    const movieList = movies[category];
    if (movieList) {
      return movieList.find((movie) => movie._id === movieId);
    }
    return null;
  });

  const bookingSection = createRef();

  const scrollToBookingSection = () => {
    bookingSection.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const getCinemaParams = useMemo(() => {
    return currentMovie
      ? {
          params: { rooms: currentMovie.rooms.join(",") },
        }
      : null;
  }, [currentMovie]);

  const [
    { response: getMovieRes, loading: movieIsLoading },
    getMovieById,
  ] = useAxios("", {
    manual: true,
  });

  const [{ response: cinemas }, getCinemas] = useAxios(
    `/api/v1/cinemas/by-room-ids`,
    {
      manual: true,
    }
  );

  const [{ response: showings, loading: showingsIsLoading }] = useAxios(
    `/api/v1/showings/by-movie-id/${movieId}`
  );

  useEffect(() => {
    if (!currentMovie && !movieIsLoading) {
      getMovieById({
        path: `/api/v1/movies/${movieId}`,
      });
    } else if (currentMovie) {
      dispatch({ type: SET_SELECTED_MOVIE_REDUCER, data: currentMovie });
      getCinemas(getCinemaParams);
    }
  }, [currentMovie, movieIsLoading, getCinemaParams]);

  useEffect(() => {
    if (getMovieRes) {
      setCurrentMovie(getMovieRes.data);
    }
  }, [getMovieRes, setCurrentMovie]);

  useEffect(() => {
    if (cinemas) {
      dispatch({ type: SET_CINEMAS_REDUCER, data: cinemas.data });
    }
  }, [cinemas, dispatch]);

  useEffect(() => {
    if (showings) {
      dispatch({ type: SET_SHOWINGS_MOVIE_REDUCER, data: showings.data });
    }
  }, [showings, dispatch]);

  return (
    <div>
      <TopBar />
      <MovieDetail
        onBookingClick={scrollToBookingSection}
        movie={currentMovie}
      />
      <div className="black-bg">
        <Container>
          <Row>
            <Wrapper>
              {currentMovie && (
                <div>
                  <p className="description">{currentMovie.description}</p>
                  <p className="title">{t("director")}</p>
                  <p>{currentMovie.director}</p>
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
                      <p key={actor}>{actor}</p>
                    ))}
                  </div>

                  <p className="title">{t("original language")}</p>
                  <p>{currentMovie.originalTitle}</p>

                  <div>
                    {!showings && showingsIsLoading ? (
                      <h2 className="buyTicket">Loading...</h2>
                    ) : (
                      ""
                    )}
                    <h2 ref={bookingSection} className="buyTicket">
                      {!cinemas || !cinemas.length
                        ? t("no showings found")
                        : t("book tickets")}
                    </h2>
                    {cinemas &&
                      showings &&
                      cinemas.data.map((item) => {
                        const showingsByCinema = showings.data.filter(
                          (showing) => showing.room.cinema === item._id
                        );
                        return (
                          <div key={item._id}>
                            <h2 className="cinema-name">{item.name}</h2>
                            <ul className="showings-list">
                              {showingsByCinema.length &&
                                showingsByCinema
                                  .filter((showing) => showing.capacity > 0)
                                  .map((el) => (
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
                                  ))}
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

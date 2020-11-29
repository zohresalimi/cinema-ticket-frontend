import React, {
  useState,
  useContext,
  useMemo,
  useEffect,
  createRef,
} from "react";

import { useTranslation } from "react-i18next";
import TopBar from "../../components/TopBar";
import MovieDetail from "../../components/MovieDetail";
import Showings from "../../components/Showings";

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
  const { t } = useTranslation();
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
        <Wrapper>
          <Container>
            <Row>
              {currentMovie && (
                <div className="full-width">
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
                  {cinemas && showings && (
                    <Showings
                      {...{
                        showings: showings.data,
                        cinemas: cinemas.data,
                        category,
                        currentMovie,
                      }}
                    />
                  )}
                </div>
              )}
            </Row>
          </Container>
        </Wrapper>
      </div>
    </div>
  );
}

export default MovieDetailPage;

/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useContext, useRef } from "react";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import useAxios from "../../hooks/useAxios";
import AppContext from "../../store/context";
import TopBar from "../../components/TopBar";
import FeaturedMovie from "../../components/FeaturedMovie";
import Cards from "../../components/Cards";
import { Container, Row } from "../../Styles/StyleComponents";
import {
  SET_PREMIERED_MOVIE_REDUCER,
  SET_UPCOMING_MOVIE_REDUCER,
  SET_CHILDREN_MOVIE_REDUCER,
  CHILDREN_GENRE,
} from "../../constants";

function HomePage() {
  const { state, dispatch } = useContext(AppContext);
  const { premiered, upcoming, children } = state.movies;
  const { t } = useTranslation();
  const [{ response: premieredMoviesList }] = useAxios(
    `/api/v1/movies/current-movie`
  );
  const [{ response: upcomingMoviesList }] = useAxios(
    `/api/v1/movies/upcoming`
  );

  const refGenre = useRef({
    params: {
      genre: CHILDREN_GENRE,
    },
  });

  const [{ response: childrenMoviesList }] = useAxios(
    `/api/v1/movies/by-genre`,
    refGenre.current
  );

  useEffect(() => {
    if (premieredMoviesList) {
      dispatch({
        type: SET_PREMIERED_MOVIE_REDUCER,
        data: premieredMoviesList.data,
      });
    }
  }, [premieredMoviesList, dispatch]);

  useEffect(() => {
    if (upcomingMoviesList) {
      dispatch({
        type: SET_UPCOMING_MOVIE_REDUCER,
        data: upcomingMoviesList.data,
      });
    }
  }, [upcomingMoviesList, dispatch]);

  useEffect(() => {
    if (childrenMoviesList) {
      dispatch({
        type: SET_CHILDREN_MOVIE_REDUCER,
        data: childrenMoviesList.data,
      });
    }
  }, [childrenMoviesList, dispatch]);

  const options = {
    loop: false,
    lazyLoad: true,
    margin: 20,
    nav: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      768: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 4,
      },
    },
  };

  return (
    <>
      <TopBar />
      <FeaturedMovie />
      <div className="black-bg">
        <Container>
          <Row>
            <h2>{t("at the cinema now")}</h2>
            <OwlCarousel className="owl-theme" {...options}>
              {premiered &&
                premiered.map((item) => {
                  return (
                    <Link
                      to={`premiered/movie-detail/${item._id}`}
                      key={item._id}
                    >
                      <Cards item={item} />
                    </Link>
                  );
                })}
            </OwlCarousel>
          </Row>

          <Row>
            <h2>{t("upcoming movies")}</h2>
            <OwlCarousel className="owl-theme" {...options}>
              {upcoming &&
                upcoming.map((item) => {
                  return (
                    <Link
                      to={`upcoming/movie-detail/${item._id}`}
                      key={item._id}
                    >
                      <Cards item={item} />
                    </Link>
                  );
                })}
            </OwlCarousel>
          </Row>
          <Row>
            <h2>{t("children and family")}</h2>
            <OwlCarousel className="owl-theme" {...options}>
              {children &&
                children.map((item) => {
                  return (
                    <Link
                      to={`children/movie-detail/${item._id}`}
                      key={item._id}
                    >
                      <Cards item={item} />
                    </Link>
                  );
                })}
            </OwlCarousel>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default HomePage;

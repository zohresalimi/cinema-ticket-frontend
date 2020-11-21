/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useContext, useRef } from "react";
import { Link } from "@reach/router";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import useAxios from "../../hooks/useAxios";
import AppContext from "../../store/context";
import TopBar from "../../components/TopBar";
import FeaturedMovie from "../../components/FeaturedMovie";
import Cards from "../../components/Cards";
import {
  SET_PREMIERED_MOVIE_REDUCER,
  SET_UPCOMING_MOVIE_REDUCER,
  SET_CHILDREN_MOVIE_REDUCER,
  CHILDREN_GENRE,
} from "../../constants";

function HomePage() {
  const { state, dispatch } = useContext(AppContext);
  const { premiered, upcoming, children } = state.movies;

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
    loop: true,
    lazyLoad: true,
    margin: 20,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
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
      <div>
        <h2> Currently at the cinema </h2>
        <OwlCarousel className="owl-theme" {...options}>
          {premiered &&
            premiered.map((item) => {
              return (
                <Link to={`premiered/movie-detail/${item._id}`} key={item._id}>
                  <img src={item.coverImage} alt="" />
                  {item.name}
                </Link>
              );
            })}
        </OwlCarousel>
      </div>

      <div>
        <h2> Upcoming movies</h2>
        <OwlCarousel className="owl-theme" {...options}>
          {upcoming &&
            upcoming.map((item) => {
              return (
                <Link to={`upcoming/movie-detail/${item._id}`} key={item._id}>
                  <Cards item={item} />
                  {/* <img src={item.coverImage} alt="" />
                  {item.name} */}
                </Link>
              );
            })}
        </OwlCarousel>
      </div>
      <div>
        <h2> Children And Family </h2>
        <OwlCarousel className="owl-theme" {...options}>
          {children &&
            children.map((item) => {
              return (
                <Link to={`children/movie-detail/${item._id}`} key={item._id}>
                  <img src={item.coverImage} alt="" />
                  {item.name}
                </Link>
              );
            })}
        </OwlCarousel>
      </div>
    </>
  );
}

export default HomePage;

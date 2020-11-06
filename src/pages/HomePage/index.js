import React, { useEffect, useContext, useRef } from "react";
import { Link } from "@reach/router";
import useAxios from "../../hooks/useAxios";
import AppContext from "../../store/context";
import TopBar from "../../components/TopBar";
import FeaturedMovie from "../../components/FeaturedMovie";
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
  return (
    <>
      <TopBar />
      <FeaturedMovie />
      <div>
        <h2> Currently at the cinema </h2>
        <ul>
          {premiered &&
            premiered.map((item) => {
              return (
                <li key={item._id}>
                  <Link to={`premiered/movie-detail/${item._id}`}>
                    <img src={item.coverImage} alt="" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>

      <div>
        <h2> Upcoming movies</h2>
        <ul>
          {upcoming &&
            upcoming.map((item) => {
              return (
                <li key={item._id}>
                  <Link to={`upcoming/movie-detail/${item._id}`}>
                    <img src={item.coverImage} alt="" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
      <div>
        <h2> Children And Family </h2>
        <ul>
          {children &&
            children.map((item) => {
              return (
                <li key={item._id}>
                  <Link to={`children/movie-detail/${item._id}`}>
                    <img src={item.coverImage} alt="" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}

export default HomePage;

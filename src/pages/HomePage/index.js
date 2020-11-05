import React, { useEffect, useContext } from "react";
import useAxios from "../../hooks/useAxios";
import AppContext from "../../store/context";
import TopBar from "../../components/TopBar";
import FeaturedMovie from "../../components/FeaturedMovie";
import Slider from "../../components/Slider";
import { SET_CURRENT_MOVIE_REDUCER } from "../../constants";

function HomePage() {
  const { state, dispatch } = useContext(AppContext);
  const { currentMovies } = state;
  const [{ response }] = useAxios(`/api/v1/movies/current-movie`);

  useEffect(() => {
    if (response) {
      console.log(response.data);
      dispatch({ type: SET_CURRENT_MOVIE_REDUCER, data: response.data });
    }
  }, [response, dispatch]);
  return (
    <>
      <TopBar></TopBar>
      <FeaturedMovie></FeaturedMovie>
      {currentMovies && <Slider items={currentMovies} />}
    </>
  );
}

export default HomePage;

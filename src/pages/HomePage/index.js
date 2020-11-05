import React from "react";
import TopBar from "../../components/TopBar";
import FeaturedMovie from "../../components/FeaturedMovie";

function HomePage(props) {
  return (
    <>
      <TopBar></TopBar>
      <FeaturedMovie></FeaturedMovie>
    </>
  );
}

export default HomePage;

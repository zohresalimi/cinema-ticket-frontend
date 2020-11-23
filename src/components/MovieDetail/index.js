import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { useTranslation } from "react-i18next";

import { Wrapper, FullImage, Image, ShadowBg, Info, MovieTitle } from "./style";
import PlayButton from "../PlayButton";
import Modal from "../Modal";
import { Container, Row, Button } from "../../Styles/StyleComponents";

function FeaturedMovie({ movie }) {
  const [playVideo, setPlayVideo] = useState(false);
  const [t] = useTranslation();

  return (
    <Wrapper>
      <FullImage>
        <Image alt="" src={movie.largeImage} />
        <ShadowBg />
        {playVideo && (
          <Modal setPlayVideo={setPlayVideo}>
            <div className="player-wrapper">
              <ReactPlayer
                className="react-player"
                url={movie.trailerUrl}
                config={{
                  youtube: {
                    playerVars: { modestbranding: 1, showinfo: 0, controls: 0 },
                  },
                }}
              />
            </div>
          </Modal>
        )}
        <PlayButton setPlayVideo={setPlayVideo} />
      </FullImage>
      <Container>
        <Row>
          <Info>
            <div className="movie-poster">
              <img src={movie.coverImage} alt="" />
            </div>
            <div className="movie-detail">
              <MovieTitle>{movie.name}</MovieTitle>
              <p>{t(movie.genre)}</p>
              <div className="movie-duration">
                <p>
                  {movie.duration.split(":")[0]}
                  <span>{t("hour")}</span>
                  {movie.duration.split(":")[1]}
                  <span>{t("min")}</span>
                </p>
                <span>|</span>
                <p>
                  {movie.age}
                  {t("year")}
                </p>
              </div>

              <div className="btn-wrapper">
                <Button>{t("buy ticket")}</Button>
              </div>
            </div>
          </Info>
        </Row>
      </Container>
    </Wrapper>
  );
}

export default FeaturedMovie;

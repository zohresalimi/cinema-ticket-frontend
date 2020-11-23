import React, { useContext, useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { useTranslation } from "react-i18next";
import {
  Wrapper,
  FullImage,
  Image,
  ShadowBg,
  Info,
  Tag,
  MovieTitle,
  Link,
} from "./style";
import PlayButton from "../PlayButton";
import Modal from "../Modal";
import AppContext from "../../store/context";

function FeaturedMovie() {
  const { state } = useContext(AppContext);
  const [movie, setMovie] = useState("");
  const [playVideo, setPlayVideo] = useState(false);
  const [t] = useTranslation();

  useEffect(() => {
    const randomIndex = Math.floor(
      Math.random() * Math.floor(state.movies.premiered.length)
    );
    setMovie(state.movies.premiered[randomIndex]);
  }, [state.movies.premiered, state.movies.premiered.lenght, state.premiered]);

  return (
    <Wrapper>
      {movie && (
        <FullImage>
          <Image alt="" src={movie.largeImage} />
          <ShadowBg />
          {playVideo && (
            <Modal setPlayVideo={setPlayVideo}>
              <div className="player-wrapper">
                <ReactPlayer
                  className="react-player"
                  url={movie.trailerUrl}
                  width="100%"
                  height="100%"
                  config={{
                    youtube: {
                      playerVars: {
                        modestbranding: 1,
                        showinfo: 0,
                        controls: 0,
                      },
                    },
                  }}
                />
              </div>
            </Modal>
          )}
          <PlayButton setPlayVideo={setPlayVideo} />

          <Info>
            <Tag>{t("at the cinema now")}</Tag>
            <MovieTitle>
              <Link href="/">{movie.name}</Link>
            </MovieTitle>
          </Info>
        </FullImage>
      )}
    </Wrapper>
  );
}

export default FeaturedMovie;

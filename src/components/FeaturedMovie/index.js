import React, { useContext, useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { useTranslation } from "react-i18next";
import ContentLoader from "react-content-loader";

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
      {!movie ? (
        <ContentLoader
          speed={2}
          width={1500}
          height={600}
          viewBox="0 0 1500 600"
          backgroundColor="#262626"
          foregroundColor="#575757"
        >
          <rect x="504" y="429" rx="3" ry="3" width="131" height="9" />
          <rect x="503" y="451" rx="3" ry="3" width="258" height="9" />
          <rect x="503" y="484" rx="3" ry="3" width="170" height="12" />
          <circle cx="685" cy="118" r="59" />
          <rect x="273" y="285" rx="0" ry="0" width="194" height="278" />
          <rect x="503" y="514" rx="0" ry="0" width="104" height="48" />
        </ContentLoader>
      ) : (
        <FullImage>
          <Image alt="" src={movie.largeImage} />
          <ShadowBg />
          {playVideo && (
            <Modal closeModal={() => setPlayVideo(false)}>
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
              <p>{movie.name}</p>
            </MovieTitle>
          </Info>
        </FullImage>
      )}
    </Wrapper>
  );
}

export default FeaturedMovie;

import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { useTranslation } from "react-i18next";
import ContentLoader from "react-content-loader";

import { Wrapper, FullImage, Image, ShadowBg, Info, MovieTitle } from "./style";
import PlayButton from "../PlayButton";
import Modal from "../Modal";
import { Container, Row, Button } from "../../Styles/StyleComponents";

function MovieDetail({ movie, onBookingClick }) {
  const [playVideo, setPlayVideo] = useState(false);
  const [t] = useTranslation();

  return (
    <Wrapper data-testid="wrapper">
      <FullImage>
        {!movie ? (
          <ContentLoader
            speed={2}
            uniqueKey="movie-detail-loader"
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
          <>
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
          </>
        )}
      </FullImage>
      {movie && (
        <Container>
          <Row>
            <Info>
              <div className="movie-poster">
                <img src={movie.coverImage} alt="" />
              </div>
              <div className="movie-detail">
                <MovieTitle>{movie.name}</MovieTitle>
                <p>{movie.genre.map((g) => t(g)).join(", ")}</p>
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
                  <Button onClick={onBookingClick} data-testid="booking-scroll">
                    {t("buy ticket")}
                  </Button>
                </div>
              </div>
            </Info>
          </Row>
        </Container>
      )}
    </Wrapper>
  );
}

export default MovieDetail;

import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
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

function FeaturedMovie() {
  const [playVideo, setPlayVideo] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModalState = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <Wrapper>
      <FullImage>
        <Image
          alt=""
          src="https://catalog.cinema-api.com/cf/images/ncg-images/9e5d23a9c1624f68859caedbf35ec3de.jpg?width=1920&version=9CD85BE7BA3CC619CC4E8D5A82DCA1C1&format=webp"
        />
        <ShadowBg />
        {playVideo && (
          <Modal setPlayVideo={setPlayVideo}>
            <div className="player-wrapper">
              <ReactPlayer
                className="react-player"
                url="https://youtu.be/tiBE56vQ0Fg"
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

        <Info>
          <Tag> Movie</Tag>
          <MovieTitle>
            <Link href="/">Movie Tilte</Link>
          </MovieTitle>
        </Info>
      </FullImage>
    </Wrapper>
  );
}

export default FeaturedMovie;

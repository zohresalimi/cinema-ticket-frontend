import React from "react";
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
import { Container, Row, Col } from "../../Styles/StyleComponents";
import PlayButton from "../PlayButton";

function FeaturedMovie(props) {
  return (
    <Wrapper>
      <FullImage>
        <Image
          alt=""
          src="https://catalog.cinema-api.com/cf/images/ncg-images/9e5d23a9c1624f68859caedbf35ec3de.jpg?width=1920&version=9CD85BE7BA3CC619CC4E8D5A82DCA1C1&format=webp"
        />
        <ShadowBg />
        <PlayButton />
        <Info>
          <Tag> Movie</Tag>
          <MovieTitle>
            <Link>Movie Tilte</Link>
          </MovieTitle>
        </Info>
      </FullImage>
    </Wrapper>
  );
}

export default FeaturedMovie;

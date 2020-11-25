import styled from "styled-components";

export const Wrapper = styled.div`
  font-family: ${(props) => props.theme.fontFamily.sf};
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.black};
`;

export const FullImage = styled.div`
  height: ${(props) => props.theme.fullImage.height};
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 375px) {
    max-height: 540px;
  }
`;

export const Image = styled.img`
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  object-position: bottom;
  height: 100%;
`;

export const ShadowBg = styled.div`
  background: linear-gradient(
    -180deg,
    transparent 50%,
    rgba(0, 0, 0, 0.68) 85%,
    #000
  );
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Info = styled.div`
  position: relative;
  margin-top: -${(props) => props.theme.fullImage.height.replace("px", "") / 2.5}px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  .movie-poster {
    width: 12rem;
    img {
      max-width: 100%;
      display: block;
      border-radius: 0.25rem;
    }
  }
  .movie-detail {
    text-transform: capitalize;
    margin-left: 1.5rem;
    h2 {
    }
    p {
      display: inline-block;
      margin: 5px 0;
    }
    .btn-wrapper {
      margin-top: 10px;
    }
    .movie-duration {
      text-transform: lowercase;
      margin: 0;
      span {
        margin: 0 5px;
      }
    }
  }
`;
export const MovieTitle = styled.h2`
  font-family: ${(props) => props.theme.fontFamily.sf};
  color: ${(props) => props.theme.colors.white};
  margin: 20px auto;
`;

import styled from "styled-components";

export const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: inherit;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
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

export const Link = styled.a`
  display: inline-block;
  vertical-align: top;
  cursor: pointer;
  font-weight: ${(props) => props.weight};
  &:hover {
    text-decoration: underline;
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
  position: absolute;
  width: 100%;
  max-width: 48rem;
  left: 50%;
  bottom: 2rem;
  padding: 0 1rem;
  text-align: center;
  white-space: normal;
  transform: translateX(-50%);
`;

export const Tag = styled.span`
  font-family: ${(props) => props.theme.fontFamily.sf};
  font-size: ${(props) => props.theme.fontSizes.tag};
  background: ${(props) => props.theme.colors.red};
  color: ${(props) => props.theme.colors.white};
  border-radius: 1px;
  line-height: 1.5rem;
  height: 1.5rem;
  padding: 0.3rem 0.6rem;
`;
export const MovieTitle = styled.h1`
  font-family: ${(props) => props.theme.fontFamily.sf};
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.white};
  line-height: 3.5rem;
  text-transform: capitalize;
  margin: 20px auto;
`;

import styled from "styled-components";

const Wrapper = styled.div`
  font-family: ${(props) => props.theme.fontFamily.sf};
  width: 100%;
  margin-top: 40px;
  font-size: ${(props) => props.theme.fontSizes.content};
  color: ${(props) => props.theme.colors.darkGray};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  text-align: center;
  .image-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    img {
      width: 15%;
      @media only screen and (min-width: 375px) {
        width: 20%;
      }
    }
  }
  h1 {
    width: 100%;
    font-size: ${(props) => props.theme.fontSizes.medium};
  }
  p {
    width: 100%;
    font-size: ${(props) => props.theme.fontSizes.content};
    margin: 5px 0;
    span {
      font-size: ${(props) => props.theme.fontSizes.medium};
      margin: 0 10px;
    }
  }
`;

export { Wrapper as default };

import styled from "styled-components";

const Wrapper = styled.div`
  font-family: ${(props) => props.theme.fontFamily.sf};
  width: 100%;
  margin-top: 40px;
  font-size: ${(props) => props.theme.fontSizes.content};
  color: ${(props) => props.theme.colors.textColor};
  margin-bottom: 20px;
  h4 {
    font-size: ${(props) => props.theme.fontSizes.medium};
  }
  p {
    font-size: ${(props) => props.theme.fontSizes.content};
    margin: 5px 0;
    span {
      font-size: ${(props) => props.theme.fontSizes.medium};
      margin: 0 10px;
    }
  }
  .sub-title {
    font-size: ${(props) => props.theme.fontSizes.small};
    color: ${(props) => props.theme.colors.gray};
    margin: 0 10px;
  }
  .movie-info {
    display: flex;
    justify-content: end;
    .info {
      display: flex;
      flex-direction: column;
      margin-left: 20px;
    }
  }
  .row-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 5px;
    border-bottom: 1px solid #ccc;
  }

  @media only screen and (max-width: 375px) {
    .movie-info{
      display: flex;
      flex-direction: column;
    }

`;

export { Wrapper as default };

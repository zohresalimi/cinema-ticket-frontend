import styled from "styled-components";

const Wrapper = styled.div`
  font-family: ${(props) => props.theme.fontFamily.sf};
  width: 100%;
  margin-top: 40px;
  font-size: ${(props) => props.theme.fontSizes.content};
  color: ${(props) => props.theme.colors.textColor};
  margin-bottom: 20px;
  p {
    font-size: ${(props) => props.theme.fontSizes.small};
    text-align: center;
    span {
      font-size: ${(props) => props.theme.fontSizes.medium};
      margin: 0 10px;
    }
  }
  .column-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;

    div[disabled] {
      pointer-events: none;
      background-color: #252424;
    }
    .seat {
      width: 30px;
      height: 30px;
      border: 1px solid #ccc;
      margin: 3px;
      border-radius: 0 0 0.5em 0.5em;
      cursor: pointer;
      &.taken {
        background-color: #a9a8a8;
        &::before {
          content: "x";
          color: #454343;
          font-weight: 300;
          font-family: Arial, sans-serif;
          text-align: center;
          display: block;
          font-size: 25px;
        }
      }
      &.reserved {
        pointer-events: none;
        animation: blinker 1s linear infinite;
      }
      a:hover {
        background-color: "green";
      }
      &.selected {
        background-color: rgb(235 51 87);
      }
      &.reserved {
        background-color: rgb(170, 255, 255);
      }
    }
  }

  @keyframes blinker {
    50% {
      opacity: 0.5;
    }
  }
`;

export { Wrapper as default };

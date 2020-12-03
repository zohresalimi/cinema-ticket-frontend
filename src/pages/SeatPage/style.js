import styled from "styled-components";

const Wrapper = styled.div`
  font-family: ${(props) => props.theme.fontFamily.sf};
  width: 100%;
  margin-top: 40px;
  font-size: ${(props) => props.theme.fontSizes.content};
  color: ${(props) => props.theme.colors.textColor};
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  .guideline {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #ccc;
    margin: 20px 0;
    padding: 20px 0;
    svg {
      width: 30px;
      margin: 0 10px;
    }

    .available {
      svg {
        fill: #ffffff;
        stroke: #797979;
        stroke-width: 8px;
      }
    }
    .taken {
      svg {
        fill: #636363;
      }
    }

    .reserved {
      svg {
        pointer-events: none;
        animation: blinker 1s linear infinite;
        fill: #ecc31a;
        stroke: #cca505;
      }
    }
    .selected {
      svg {
        fill: rgb(235 51 87);
      }
    }
  }
  justify-content: center;

  p {
    font-size: ${(props) => props.theme.fontSizes.small};
    color: ${(props) => props.theme.colors.darkGray};
    text-align: center;
    span {
      font-size: ${(props) => props.theme.fontSizes.medium};
      color: ${(props) => props.theme.colors.black};
      margin: 0 10px;
    }
  }
  .column-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;

    div[disabled] {
      svg {
        fill: #ccc;
        stroke: #797979;
      }
      pointer-events: none;
    }

    .seat {
      width: 30px;
      height: 30px;
      margin: 3px;
      cursor: pointer;
      fill: #ffffff;
      stroke: #797979;
      stroke-width: 8px;
      &.taken {
        fill: #636363;
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
        fill: "green";
      }
      &.selected {
        fill: rgb(235 51 87);
      }
      &.reserved {
        fill: #ecc31a;
        stroke: #cca505;
        stroke-width: 8px;
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

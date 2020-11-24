import styled from "styled-components";

const Quantity = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: ${(props) => props.theme.fontSizes.medium};
  }
  div {
    button {
      width: 30px;
      height: 30px;
      cursor: pointer;
      font-size: ${(props) => props.theme.fontSizes.small};
    }
    span {
      font-family: ${(props) => props.theme.fontFamily.sf};
      font-size: ${(props) => props.theme.fontSizes.medium};
      width: 60px;
      display: inline-block;
      text-align: center;
    }
  }
`;

export { Quantity as default };

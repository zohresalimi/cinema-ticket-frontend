import styled from "styled-components";

export const Div = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const PlayBtn = styled.a`
  display: block;
  width: 5rem;
  height: 5rem;
  line-height: 85px;
  text-indent: 5px;
  border-radius: 50%;
  text-align: center;
  text-decoration: none;
  background: ${(props) => props.theme.colors.white};
  font-size: 1.8rem;
  color: #000;
  box-shadow: 0 0 3px gray;
  font-weight: bold;
  cursor: pointer;
`;

export const RoundBut = styled.div`
  width: 5rem;
  height: 5rem;
  padding: 8px;
  border-radius: 50%;
  background: transparent;
  transition: 0.3s;
  &:hover {
    background: hsla(0, 0%, 100%, 0.12);
  }
`;

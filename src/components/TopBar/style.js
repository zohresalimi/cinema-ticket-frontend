import styled from "styled-components";

export const TopMenuContainer = styled.div`
  font-family: "sfMedium";
  display: inline-block;
  vertical-align: top;
  width: 100%;
  height: 3rem;
  background-color: ${(props) => props.theme.colors.red};
  color: ${(props) => props.theme.colors.white};
`;

export const Wrapper = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
`;
